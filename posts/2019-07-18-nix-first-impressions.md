---
title: Nix and NixOS -- first impressions
---

Since March, I've been using NixOS as my primary operating system and Nix as my primary package manager. Everything is configured in my dotfiles which are synchronized via Git between three machines:

- Personal Laptop (OSX)
- Work Laptop (OSX)
- Work Desktop (Nixos)

In this post, I'll go over some of the advantages and disadvantages of switching my setup over from Bash scripts, brew, and Arch's `pacman` to Nix/NixOS.

## Why did I switch to Nix/NixOS?

My old setup had many lot of problems, some of which included:

- **Package synchronization.** I'd have to manually install new packages across my different systems, especially cross-OS. This was especially annoying for CLI tools that didn't have proper installers, such as [the Jenkins X CLI](https://jenkins-x.io/). Nix would allow me to define cross-platform build scripts for these kinds of applications, so I'd only have to worry about this once.
- **Package version synchronization.** Even more annoying than the above was making sure I had the same version of the tools installed across all of my systems. Jenkins X in particular changes drastically across different versions, so this was especially important to me.
- **Dotfile synchronization.** I had this [janky Bash script that I wrote in 2014](https://github.com/macalinao/dotfiles/blob/09e43c5a8f38b1a6662fd73ed026e47ccef12734/install.sh) that would create symlinks from my dotfiles to my home directory. It required constant updating and it would often break and only link half of my files. I really liked how Nix generations were atomic so that a bad script I wrote wouldn't cause my system to get upgraded halfway.
- **Mistakes had permanent consequences.** I'm sure every Arch user has screwed up something in their system causing random bugs to happen. Since it's hard to uninstall things cleanly or remember what exactly you did, I would just live with the results of my mistake. Nix has simple rollbacks which are really good for if you're hacking around with random packages that you plan on uninstalling later.

I had been hearing a lot about the virtues of Nix since late last year (2018), and in March 2019 I finally decided to pull the trigger.

The main reasons why I transitioned over were:

- **Code as configuration.** I loved the idea of having configuration files deterministically install all of the applications on my computer.
- **Broad and active ecosystem.** I came from Arch, so I was used to having every Linux package under the sun available at my disposal. There was a pretty decent Nix wiki (or so I thought at the time) so I felt like I was in decent hands.
- **Functional.** Scala was my favorite language to build things at the time, and I was starting to look more into Haskell development. Pretty much everyone I ran into that used Nix also wrote Haskell, so I thought that it would get me more plugged into that programming community.

After trying out NixOS in a VM for about a week, I backed up and reformatted my Arch SSD and started from scratch.

## What went well

Aside from the above advantages, there are many things I've found to be really useful that I didn't know of when I first installed NixOS.

### XOrg configuration

One of the big reasons I got NixOS was that my XMonad installation didn't work properly on Arch out of the box. Nix would let me remove all of the confounding variables that might have been interfering with a proper installation of the window manager.

Here's my configuration:

In my `configuration.nix`:

```
services.xserver = {
  enable = true;
  # displayManager.startx.enable = true;
  dpi = 96;

  desktopManager = {
    default = "xfce";
    xterm.enable = false;
    xfce = {
    enable = true;
  };
};
```

In my `home-manager` config:

```
xsession.enable = true;

xsession.windowManager.xmonad = {
  enable = true;
  enableContribAndExtras = true;
  config = ../dotfiles/xmonad/xmonad.hs;
};
```

Through this, I'm able to set up an XMonad config and get it working properly on startup. Furthermore, since it's code as configuration, I'm able to transfer this between machines or to friends I'm evangelizing XMonad to. It was super easy to set up, and debugging was pretty painless since I'd just have to `nixos-rebuild switch` whenever I made changes.

### General service configuration

There are several things I never set up on my Arch computer because I thought they would be too complicated to set up in my dotfiles, and if I broke things I wouldn't easily be able to replicate my issues.

Here are some things I ended up building into my configuration:

#### [An nginx ingress for my HTTP services.](https://github.com/macalinao/dotfiles/blob/master/nixos/services/nginx.nix)

I wanted a way to be able to share certain services with other people and devices on my network without compromising my firewall, so I set up an nginx proxy. This was really easy to setup, and I did not need to

## What went poorly

Nix/NixOS are not for the faint of heart. You have to be reasonably proficient with a lot of things to use NixOS at all. While most things are made 10x easier by Nix, some things are extremely difficult and you don't know whether or not your fix will work.

If you already don't like writing custom logic in your build scripts, you will have an even worse time just trying to get your system to behave the way you want it to if you diverge even slightly from defaults. Think debugging webpack configuration, but instead of just worrying about JavaScript you have to worry about your _entire system_.

There's several UX issues that make me not recommend this to beginners or people that have tight deadlines.

### Sometimes nixpkgs-unstable just breaks.

A package I wanted to install uses Wine on the backend, but when I tried to install it, it started to complain that [qtbase could not build](https://github.com/NixOS/nixpkgs/issues/63829). There are several solutions to this problem, including:

- **Forking nixpkgs and fixing it yourself.** Nix makes it really easy to do this, though with this you'll have to maintain your fork and your build cache is more limited. I haven't done this because of those two reasons.
- **Overriding the derivation.** You can replace any package in Nixpkgs (or anywhere for that matter) with a custom derivation. However, sometimes this doesn't work because the problem exists across multiple packages (as was the case with the above).

This is all really annoying to do, and you can waste a lot of time if you don't know Nix very well (like me). I often just don't install the package and wait for it to get fixed in Nixpkgs. There's also a simple workaround: to install via Brew/installer script on my Mac.

## Sometimes you get a random build error with no error message.

While writing this blog post, I was trying to upgrade my Hakyll installation (what I use to generate my blog). I was getting an error that `digest-0.0.1.2` failed to build with no error message. The solution was to add `zlib` to the `nix` section of my `stack.yaml`, but _nowhere_ in the error message did it say that I had missing zlib headers, that I needed to install zlib, etc.

I found out what I needed to do via Google, but it was still a guess. It would have been much better if I knew what I had to do from a compile error or equivalent. There is probably a way to find the error, but I couldn't find it easily.

### You need to write a derivation for everything not in Nixpkgs.

It's best to install everything through Nix derivations.

Technically, you can use installer scripts that install to `/usr/local/bin`. It feels bad though, and it's definitely better to install everything through Nix.

### Many packages don't exist.

One example is a Linux [League of Legends](https://github.com/Nefelim4ag/League-Of-Legends) installer for Arch. Now I'm forced to only use my Mac for this.

```

```
