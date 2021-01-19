# Kenen on vastuu???

Simple tool for displaying Finnish train timetables and delay causes, and attributing the delay to the specific stakeholder responsible for it. Built with Vue.js. [Available here.](https://msorri.github.io/kenenonvastuu)

Delay responsibilities are gathered from the table at the end of the [official manual](https://julkaisut.vayla.fi/pdf11/ohje_2019_rautatieliikenteen_hairiokirjausten_web.pdf), fed into Excel with Acrobat, and then formatted to machine-readable form (with macros! no json export in 2021!). No mechanism for updates exist because they seem to happen very irregularly.

Operator information and delay descriptions are fetched from the Digitraffic API, so they are always up-to-date.

This is known to break on some older trains. Might be the delay ID's changing? ¯\\\_(ツ)\_/¯