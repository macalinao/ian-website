---
title: "The Google Workspace Email Security Checklist: SPF, DKIM, and DMARC"
description: A list of all DNS records to set on new Google Workspace email subdomains, and why.
tags:
  - Security
---

Setting DNS records improperly can cause unauthorized parties to masquerade as your
email domain. In this post, I show all of the DNS records that must be added.

## Overview

- SPF
  - TXT `@`: `v=spf1 include:_spf.google.com -all`
  - TXT `*`: `v=spf1 -all`
- DMARC
  - TXT `@`: `v=DMARC1; p=quarantine; sp=reject; rua=mailto:youremail@yourdomain.com`
- DKIM
  - For Google Workspace, follow [this guide](https://support.google.com/a/answer/180504?product_name=UnuFlow&visit_id=637805508785814602-3757498782&rd=1&src=supportwidget0).

## Breakdown

### SPF HARDFAIL for unauthenticated email being sent from your root domain

- TXT `@`: `v=spf1 include:_spf.google.com -all`

This record ensures that all email being sent from your root domain comes from Google Workspace.

### SPF HARDFAIL for all email being sent from your subdomains

- TXT `*`: `v=spf1 -all`

If a subdomain does not exist, this rule ensures that all email being sent from the subdomain is flagged and/or rejected.

### DMARC

- TXT `@`: `v=DMARC1; p=quarantine; sp=reject; rua=mailto:youremail@yourdomain.com`

This rule marks all unauthenticated email from your root domain as spam (`quarantine`)
and instructs recipients of unauthenticated email to reject all email from your subdomains (`reject`).

### DKIM

- For Google Workspace, follow [this guide](https://support.google.com/a/answer/180504?product_name=UnuFlow&visit_id=637805508785814602-3757498782&rd=1&src=supportwidget0).

DKIM ensures that Google is cryptographically signing the contents of your emails. This ensures
that your email contents aren't being tampered with.
