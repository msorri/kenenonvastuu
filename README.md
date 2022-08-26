# [Kenen on vastuu???](https://msorri.github.io/kenenonvastuu)

A simple tool for displaying Finnish train timetables and delay causes, and attributing the delay to the specific stakeholder responsible for it. Built with Vue.js.

Delay responsibilities are gathered from the table at the end of the [official manual](https://ava.vaylapilvi.fi/ava/Julkaisut/Vaylavirasto/ohje_2019_rautatieliikenteen_hairiokirjausten_web.pdf), fed into Excel with Acrobat, and then formatted to a machine-readable form.

Operator information and delay descriptions are fetched from the Digitraffic API, so they are always up-to-date.