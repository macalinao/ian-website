--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TupleSections #-}
import           Data.Ord                    (comparing)
import           Control.Monad               (liftM)
import           Data.Monoid (mappend)
import qualified Data.Map as M
import           Hakyll
import qualified Data.Set as S
import           Text.Pandoc.Options
import           System.FilePath.Posix
import           Data.List
--------------------------------------------------------------------------------

main :: IO ()
main = hakyll $ do
    match "images/*" $ do
        route   idRoute
        compile copyFileCompiler

    match "css/*" $ do
        route   idRoute
        compile compressCssCompiler

    match "static/*" $ do
        route   idRoute
        compile copyFileCompiler

    match "resume/*" $ do
        route   idRoute
        compile copyFileCompiler

    match (fromList ["about.rst", "contact.markdown"]) $ do
        route   $ setExtension "html"
        compile $ pandocCompiler
            >>= loadAndApplyTemplate "templates/default.html" defaultContext
            >>= relativizeUrls

    match "posts/*" $ do
        route $ setExtension "html"
        compile $ pandocMathCompiler
            >>= loadAndApplyTemplate "templates/post.html"    postCtx
            >>= loadAndApplyTemplate "templates/default.html" postCtx
            >>= relativizeUrls

    notebook "diffeq"

    create ["writing/index.html"] $ do
        route idRoute
        compile $ do
            posts <- recentFirst =<< loadAll "posts/*"
            let archiveCtx =
                    listField "posts" postCtx (return posts) `mappend`
                    constField "title" "Writing"             `mappend`
                    defaultContext

            makeItem ""
                >>= loadAndApplyTemplate "templates/archive.html" archiveCtx
                >>= loadAndApplyTemplate "templates/default.html" archiveCtx
                >>= relativizeUrls

    match "pages/*" $ do
        -- Use base route
        route $ baseWithExtension "html"
        compile $ pandocMathCompiler
            >>= loadAndApplyTemplate "templates/page.html"    postCtx
            >>= loadAndApplyTemplate "templates/default.html" postCtx
            >>= relativizeUrls

    match "index.html" $ do
        route idRoute
        compile $ do
            posts <- recentFirst =<< loadAll "posts/*"
            let indexCtx =
                    listField "posts" postCtx (return posts) `mappend`
                    constField "title" "Home"                `mappend`
                    defaultContext

            getResourceBody
                >>= applyAsTemplate indexCtx
                >>= loadAndApplyTemplate "templates/default.html" indexCtx
                >>= relativizeUrls

    match "templates/*" $ compile templateBodyCompiler


--------------------------------------------------------------------------------

notebook :: String -> Rules ()
notebook id = do
    match (fromGlob $ "notes/" ++ id ++ "/index.md") $ do
        route $ setExtension "html"
        compile $ do
          notes <- loadAll $ "notes/diffeq/*" .&&. complement "notes/diffeq/index.md"

          let notebookCtx =
                listField "notes" defaultContext (notebookOrder =<< return notes) `mappend`
                defaultContext

          pandocMathCompiler
            >>= loadAndApplyTemplate "templates/notebook.html" notebookCtx
            >>= loadAndApplyTemplate "templates/default.html"  notebookCtx
            >>= relativizeUrls

    match (fromGlob $ "notes/" ++ id ++ "/*") $ do
        route $ setExtension "html"
        compile $ pandocMathCompiler
            >>= loadAndApplyTemplate "templates/post.html"    postCtx
            >>= loadAndApplyTemplate "templates/default.html" postCtx
            >>= relativizeUrls


notebookOrder :: MonadMetadata m => [Item a] -> m [Item a]
notebookOrder =
    sortByM $ \x -> getMetadataField (itemIdentifier x) "ordering"
  where
    sortByM :: (Monad m, Ord k) => (a -> m k) -> [a] -> m [a]
    sortByM f xs = liftM (map fst . sortBy (comparing snd)) $
                   mapM (\x -> liftM (x,) (f x)) xs


postCtx :: Context String
postCtx =
    dateField "date" "%B %e, %Y" `mappend`
    defaultContext

-- Thanks http://travis.athougies.net/posts/2013-08-13-using-math-on-your-hakyll-blog.html
pandocMathCompiler =
    let mathExtensions = [Ext_tex_math_dollars, Ext_tex_math_double_backslash,
                          Ext_latex_macros]
        defaultExtensions = writerExtensions defaultHakyllWriterOptions
        newExtensions = foldr S.insert defaultExtensions mathExtensions
        writerOptions = defaultHakyllWriterOptions {
                          writerExtensions = newExtensions,
                          writerHTMLMathMethod = MathJax ""
                        }
    in pandocCompilerWith defaultHakyllReaderOptions writerOptions

baseWithExtension :: String -> Routes
baseWithExtension ext = customRoute $
  (`replaceExtension` ext) . takeBaseName . toFilePath
