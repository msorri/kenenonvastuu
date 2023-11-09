# Kenen on vastuu???

Simple tool for displaying Finnish train timetables and delay causes, and attributing the delay to the specific stakeholder responsible for it. Built with Vue.js. [Available here.](https://msorri.github.io/kenenonvastuu)

Delay responsibilities are gathered from the table at the end of the [official manual](https://ava.vaylapilvi.fi/ava/Julkaisut/Vaylavirasto/vo_2023-15_hairiokirjausten_kasikirja_web.pdf), fed into Excel with Acrobat, and then formatted to JSON (with macros!). No mechanism for updates exist because they seem to happen very irregularly (last manual was valid for four years).

## Version history
| Version             | Release date | Release notes                                                                                       |
| ------------------- | ------------ | --------------------------------------------------------------------------------------------------- |
| 2.0.0 _current_     | 9.11.2023    | Update category codes to the updated manual released on 15.3.2023, add descriptions, update styling |
| Unversioned ¯\\\_(ツ)\_/¯ | 26.8.2022    | Fix category code id changes, other miscellanous fixes                                                    |
| 1.0.0               | 19.1.2021    | Initial stable release                                                                              |