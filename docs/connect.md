Collegare il vostro Core
===

<iframe class="vine-embed" src="https://vine.co/v/hFHPMue5lgd/embed/simple" width="320" height="320" frameborder="0"></iframe>

Il metodo più semplice per collegare lo Spark Core al Wi-Fi è usare l'applicazione Spark mobile per iPhone o Android. Nel caso questo per voi non va bene o non avete un telefono iOS/Android, ci sono degli altri metodi.

Per tutti i metodi seguenti lo Spark Core deve essere in modalità "ascolto", riconoscibile dal LED blu lampeggiante.

<iframe class="vine-embed" src="https://vine.co/v/hFHlpBDELeU/embed/simple" width="320" height="320" frameborder="0"></iframe>

Il Core parte in modo ascolto per default quindi, se il vostro Core è nuovo, dovrebbe partire direttamente in modalità ascolto. Altrimenti tenete premuto il bottone MODE per tre secondi.

## Configurazione smart con l'app Spark

<iframe class="vine-embed" src="https://vine.co/v/hFH09MJwbxg/embed/simple" width="320" height="320" frameborder="0"></iframe>

Dopo aver scaricato l'applicazione Spark Core dall'App Store o da Google Play, dovete creare un account. Dopodiché verrete chiamati a collegare il vostro Core mediante un processo chiamato configurazione Smart. Se il vostro Core ha un connettore u.FL, dovete collegare un'antenna esterna prima di procedere con la configurazione Smart. *NOTA: Il vostro telefono deve essere collegato alla stessa rete Wi-Fi dove vorrete collegare il Core.* L'applicaione riempirà automaticamente il campo SSID con il nome della rete Wi-Fi dove è collegato il vostro telefono. Immettete la vostra parola d'ordine Wi-Fi e premete connect.

<iframe class="vine-embed" src="https://vine.co/v/hFwubhA3JXV/embed/simple" width="320" height="320" frameborder="0"></iframe>

Smart Config può durare fino ad un minuto, quindi abbiate pazienza. Più il vostro smartphone è vicino al Core e più questo si collegherà velocemente. Quando il Core riceverà il segnale passerà questa sequenza di luci:

- **Blu fisso**: Credenziali ricevute
- **Verde lampeggiante**: Connessione alla rete Wi-Fi
- **Ciano lampeggiante**: Connessione allo Spark Cloud
- **Ciano pulsante**: Connesso allo Spark Cloud

<iframe class="vine-embed" src="https://vine.co/v/hFdj1TJjA9M/embed/simple" width="320" height="320" frameborder="0"></iframe>

Una volta che il Core si è connesso, il vostro telefono associerà il vostro Core collegandolo al vostro account. Dopo dovrete dare un nome al vostro Core. Se non siete sicuri sul processo di associazione potete annunciarvi sulla [Spark Web IDE](https://www.spark.io/build) e cliccare sull'icona "Cores" in fondo alla pagina. Il vostro Core é nella lista? Bene! Il mondo è perfetto.

*NOTA: Il Core DEVE essere online (ciano pulsante) per far sì che il processo di associazione funzioni. Se lo Spark Core è stato associato da qualcun'altro, l'applicazione non lo riconoscerà. Se dovete trasferire un Core ad un altro account, mandate un mail a [hello@spark.io](mailto:hello@spark.io).*

<iframe class="vine-embed" src="https://vine.co/v/hFdPKul226i/embed/simple" width="320" height="320" frameborder="0"></iframe>

Se volete connettere più Cores, dovrete seguire questo processo per ognuno di essi. Saprete quale è quale dal segnale dell'arcobaleno.

<iframe class="vine-embed" src="https://vine.co/v/hFdxB9lHOmv/embed/simple" width="320" height="320" frameborder="0"></iframe>

Una volta finito di nominare i vostri Cores, potrete controllarli con l'applicazione Tinker! Provate *digitalWrite* sul pin D7 per accendere il LED sul Core.

## Smart Config con l'applicazione TI

Lo Smart Config con l'applicazione Texas Instruments CC3000 è simile al processo descritto prima, sebbene non sia necessario un account Spark e  TI ha anche un applet Java che può lavorare da un computer Mac, Windows, o Linux.

Seguite le istruzioni sul sito di Texas Instrument:

[CC3000 Smart Config @ Texas Instruments](http://processors.wiki.ti.com/index.php/CC3000_Smart_Config)

L'unica cosa che è differente è che dovrete attivare la chiave AES opzionale e immettere `sparkdevices2013`.

*NOTA: L'applicazione Android di TI non é disponibile su Google Play; dovrete scaricarla voi dalla loro pagina web e caricare l'apk voi stessi.*

## Connessione via USB

Potete anche connettere lo Spark Core alla vostra rete Wi-Fi via USB comunicando via Serial. *NOTA: Questo funziona solo se lo Spark Core è in modalità di ascolto (cioè il led RGB lampeggia blu)*.

Prima di tutto dovrete scaricare un'applicazione di terminale seriale.

Per utenti __Windows__ , raccomandiamo [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/).
Dovrete pure installare il driver per Windows:

[< Driver Windows per lo Spark Core >](https://s3.amazonaws.com/spark-website/Spark.zip)

[CoolTerm](http://freeware.the-meiers.org/) fornisce una bella interfaccia GUI.
![CoolTerm settings](images/coolterm-settings.png)
![CoolTerm setup](images/coolterm-setup.png)

Per utenti __Mac__ , sia CoolTerm che screen vanno bene.

Per un utilizzo __Linux__ command line, [GNU Screen](https://www.gnu.org/software/screen/) funziona bene.
(Con OS X, il modo command line viene fatto partire con un comando simile a `screen /dev/cu.usbmodem1411 9600`.
Su Ubuntu, è qualcosa del genere `screen /dev/ttyACM0 9600`. Dove si trovano i Device può variare: cercate nella cartella `/dev` se non lo trovate subito)

__Come fare__

Connettete il vostro Spark Core al computer via USB. Mentre lo Spark Core è in modalità ascolto, aprire una porta seriale via USB usando i parametri standard che dovrebbero essere:

- Baudrate: 9600
- Data Bits: 8
- Parity: none
- Stop Bits: 1

Dopo aver aperto una connessione seriale, avete a disposizione due comandi premendo **w** o **i** sulla tastiera. Ecco cosa fanno:

- **w**: Definisce l'SSID e la password del vostro Wi-Fi
- **i**: ("i" come identifica) Legge l'ID dello Spark Core

**NOTA:** Se collegate il vostro Core via USB per la prima volta, avete bisogno di una *associazione* manuale del Core per connetterlo al vostro account. Si veda la sezione su [Associare il vostro Core](/#/connect/claiming-your-core) più in basso per maggiori dettagli.

## Prossimamente: credenziali codificate fisse

Al momento non esiste ancora un meccanismo per codificare in modo fisso il vostro SSID e password nel firmaware dello Spark Core. Ci stiamo lavorando!

Associare il vostro Core
===

Una volta che il vostro Core è connesso, ha bisogno di essere *associato* in modo da poter essere legato al vostro account. Questo è ciò che vi permette di controllare il vostro Core e fare in modo che nessun altro lo possa fare.

Se usate l'applicazione mobile per configurare il vostro Core, dovrebbe associarsi automaticamente. Comunque se connettete il vostro Core via USB, o se l'associazione non ha avuto successo, potete associarlo manualmente.

Per prima cosa, dovete ricevere il vostro ID del Core. Potete fare questo aprendo una connessione seriale con il Core e premendo il tasto **i** (vedi le istruzioni sopra su come connettersi via USB). Dovrebbe essere visualizzato un numero di questo tipo:

    # Esempio di Core ID
    55ff68064989495329092587

---

Dopo aprite lo [Spark Build](https://www.spark.io/build) e cliccate sull'icona 'Cores'. Premete il bottone 'Add a Core', e immettete il vostro ID nel campo di testo.

Metteremo a disposizione uno strumento command-line per semplificare questo processo; rimanete collegati!

Risoluzione di problemi
===

Ci possono essere molte ragioni per cui il vostro Spark Core non riesce a collegarsi alla vostra rete. Ci sono differenti tipi di reti Wi-Fi e lo Spark Core e il CC3000 non li supportano tutti. È un importante traguardo per noi riuscire a collegarsi in modo semplice e senza problemi al maggior numero possibilee di essi, e il vostro feedback è estremamente importante per poterci migliorare.

Lo Spark Core lavora al meglio con una rete domestica tradizionale: una rete semplice con sicurezza WPA/WPA2 o WEP (o libera), con un router unico di una ditta conosciuta (Apple, Netgear, Linksys, D-Link, ecc.) senza settaggi particolari. Più la vostra rete diverge dalle norme e più probabilmente avrete dei problemi.

Ci sono dei problemi conosciuti con i seguenti tipi di rete:

- **reti solo 802.11n**. Lo Spark Core è 802.11b/g. La maggior parte delle reti 802.11n sono retro-compatibili con 802.11b/g, ma se la vostra non lo è, lo Spark Core non si collegherà.
- **Reti con sicurezza ["captive portal"](http://en.wikipedia.org/wiki/Captive_portal)**. Un captive portal è quella piccola pagina web che vi chiede di annunciarvi alla rete o di accettare delle condizioni d'uso, come per esempio Starbucks. Lo Spark Core non può accedere a questi portali.
- **Reti aziendali**. Abbiamo avuto differenti risultati connettendoci a reti aziendali, sebbene non sia ancora ben chiaro cosa sono le cause dei problemi. Questo è un tema su cui stiamo lavorando per migliorare.
- **Reti complesse**. Reti con routers multipli, con firewalls non standard e con parametri non standard.
- **Reti con sicurezza WEP**. Se potete collegarvi con l'applicazione mobile, reti con sicurezza WEP dovrebbero essere OK. Comunque al momento non potete collegarvi ad una rete con sicurezza WEP via USB. Stiamo creando una soluzione per questo che dovrebbe essere disponibile nelle prossime settimane.
- **Canali sopra l'11**. Questa è particolarmente una problematica internazionale; se siete fuori dall'America, il vostro router Wi-Fi potrebbe lavorare sui canali 12, 13, o 14, che il CC3000 non supporta. Si prega di usare il canale 11 o più basso.

Bene, andiamo in profondità. Se il vostro Spark Core non si connette alla vostra rete Wi-Fi, raccomandiamo i seguenti passi:

## PASSO 0: Controllate le cose basilari

Ci sono alcune cose di base da controllare:

- Controllate le credenziali del vostro Wi-Fi (SSID e password) per essere sicuri di averli immessi in modo corretto.
- Siate sicuri di essere nel raggio di copertura della vostra rete Wi-Fi. Se il vostro telefono o computer hanno una connessione debole nello stesso luogo, cercate di avvicinarvi al vostro punto di accesso Wi-Fi.
- Se utilizzate un Core u.FL, assicuratevi di avere un'antenna collegata, e che sia ben fissata.
- Assicuratevi che il vostro Core abbia abbastanza alimentazione per trasmettre signali Wi-Fi (300mA di punta). Provate differenti sorgenti di alimentazione o sconnettete compenenti che succhiano troppa corrente.

## PASSO 1: Configurate il vostro Core via USB

In alcune reti, Smart Config non funziona, ma il Core può connettersi alla rete senza problemi. Abbiamo implementato un meccanismo di back-up in modo da poter configurare il vostro Core via USB. Per istruzioni, vedi sopra. Non dimenticate di associare il vostro Core manualmente se non l'avete ancora fatto!

## PASSO 2: Provate un'altra rete

Ci sono molte ragioni per cui il vostro Core può non connettersi; alcune di queste hanno a che fare con lo Spark Core; altre hanno a che fare col il vostro apparecchio mobile che spedisce le credenziali del Wi-Fi; altre hanno a che fare con la rete. Se il vcostro Core non si connette, provate un'altra rete Wi-Fi. Questo potrà velocemente aiutarvi a capire quale genere di problema state riscontrando.


## PASSO 3: Reboot e liberare la memoria

<iframe class="vine-embed" src="https://vine.co/v/hFHQlj6iuKT/embed/simple" width="320" height="320" frameborder="0"></iframe>

Spesso gli apparecchi elettronici cominciano a comportarsi in modo corretto dopo averli spenti e riaccesi. Provate a:

- Chiudere la vostra applicazione mobile e riaprirla
- Scollegare e ricollegare lo Spark Core
- Pulire la memoria delle reti Wi-Fi dello Spark Core tenendo premuto il bottone MODE per 10 secondi. Dopo 3 secondi la luce dovrebbe cominciare a lampeggiare blu; dopo 10 secondi dovrebbe emettere dei veloci flashes blu. Questo significa che la memoria è stata liberata.
- Impostare il firmware dello Spark Core ai valori predefiniti di fabbrica. Fare questo in modo giusto può essere un po' complicato, si veda [questo video](https://community.spark.io/t/how-to-do-a-factory-reset/2579) per un'illustrazione.

## PASSO 4: Controllare i valori del router

Ci sono milioni di possibilità per cui i parametri del router potrebbero causare dei problemi, ma ecco alcune cose da controllare per primo:

- **Usare DHCP**. Anche se lo Spark Core può gestire indirizzi IP statici, non è configurato per questo dall'inizio, quindi dovrete entrare nel codice sorgente.
- **Disattivate il controllo degli accessi e i firewalls**. Non permanentemente, ma temporaneamente, per vedere se questo risolve il problema. Se lo fa, si spera possiate modificare i settaggi per far funzionare il Core piuttosto che disabilitare la sicurezza L'unica modifica che potreste dover fare al vostro router è aprire la porta in uscita 5683, la porta [CoAP](http://en.wikipedia.org/wiki/Constrained_Application_Protocol) di default che lo Spark Core usa per connettersi allo spark Cloud. Se il vostro Core lampeggia ciano e ogni tanto lampeggia rosso, probabilmente il problema è dovuto al router.

## PASSO 5: Cercare nei forums

È probabile che altri abbiano già riscontrato il vostro stesso problema. Il miglior modo per controllare ed imparare dagli altri è cercare nei forums; cercate il vostro particolare sintomo o il modello e marca del vostro router Wi-Fi per trovare dei commenti rilevanti.

[Visitate i forums >](https://community.sparkdevices.com)

## PASSO 6: Riportate un rapporto

Ci fa piacere sentire i vostri problemi, indipendentemente se siete riusciti a risolverli, in modo da migliorare la nostra piattaforma. Se non siete riusciti a risolvere il vostro problema, speriamo che noi o la comunità sarà capace di aiutare.

Si prega di riportare i problemi come risposta ad un argomento, o se sono differenti dagli altri problemi, come nuovo argomento. Quando riportate un problema, si prega di includere:

- Marca e modello del Router
- Sicurezza della rete (aperta, WEP, WPA2, ecc.)
- Ambiente (casa, piccolo ufficio, azienda, rete pubblica, ecc.)
- Topologia di rete (numero di routers e/o estensioni di rete, stima degli aparecchi connessi con la rete)
- Internet Service Provider
- Eventuali parametri di rete che potrebbero differire dalle norme

Eliminazione dei problemi con i colori
===

Lo Spark Coreha un LED RGB posizionato sul davanti che riporta lo stato della connessione del Core. Questo LED vi può aiutare ad analizzare il Core e risolvere i problemi che riscontrate.

## Blu lampeggiante

<iframe class="vine-embed" src="https://vine.co/v/hFHPMue5lgd/embed/simple" width="320" height="320" frameborder="0"></iframe>

- *Cosa sta facendo il Core?* Il mio Core lampeggia blu.
- *Qual'è il problema?* Il vostro Core non ha le credenziali del Wi-Fi per collegarsi alla vostra rete locale
- *Come risolgo il problema?*
        
Al momento il vostro Core non ha le informazioni necessarie per connettersi alla vostra rete locale Wi-Fi. Se non l'avete ancora fatto provate ad usare l'applicazione Spark Core per [iPhone](https://itunes.apple.com/us/app/spark-core/id760157884) o [Android](https://play.google.com/store/apps/details?id=io.spark.core.android)  per inviare le vostre credenziali di rete al Core. Istruzioni dettagliate possono essere trovate  [qui](http://docs.spark.io/#/connect/connecting-your-core-smart-config-with-the-ti-app).


Se queto non funziona, provate i seguenti passi:


1. Se il vostro router supporta 802.11n, assicuratevi che supporti anche protocolli di rete Legacy e che sia configurato in questo modo (il Core supporta reti 802.11 a/c)
2. Se avete un Core con connettore u.FL, assicuratevi che l'antenna sia collegata
3. Provate [reboot e liberare la memoria](/#/connect/passo-3-reboot-e-liberare-la-memoria).
4. Se avete un telefono Android e la vostra rete non ha password, non potete usare l'applicazione Spark Core per comunicare le credenziali al vostro Core. Alternativamente provate ad usare  [l'applicazione SmartConfig di TI per configurare il vostro Core](/#/connect/smart-config-con-lapplicazione-ti).
5. Provate a configurare il vostro Core via USB.  Istruzioni si possono trovare [qui](/#/connect/connessione-via-usb).
6. Se tutto non funziona, vi preghiamo di [contattare lo Spark team](mailto:hello@sparkdevices.com) comunicando la marca ed il modello del vostro telefono.

---


## Flashing green

- *What’s the Core doing?* My Core is [flashing green](https://mtc.cdn.vine.co/r/videos/DB9E0E87311015399731217969152_1d6c83d12a3.4.3.2795910212236322177_4RBA9frM0a4pwIG_RbZgo.ZOBEbBr_CpxzoOsBNuExDz6TFldcjJSYHVh203e6F4.mp4?versionId=orM0m0DvLYdciAwsb6DYHhqb974AHMj_), but doesn’t progress to flashing Cyan.
- *What’s the problem?* Your Core has received Wi-Fi credentials (an SSID and password), but still can't connect to the Wi-Fi network.
- *How do I fix it?*

Please complete the following steps:

1. [Check the basics](/#/connect/troubleshooting-step-0-check-the-basics).
2. Try a new power source. You should be powering your Core with a power supply that is capable of providing 500mA of current.  We recommend the 5V/1A wall wart power supplies that are commonly used for charging cell phones.
3. If your network has a landing page or splash page, the Core will not be able to connect; try configuring it onto a different network.
4. Try [rebooting the Core and clearing its memory](/#/connect/troubleshooting-step-3-reboot-and-clear-memory).
5. Try a factory reset.  Hold down both buttons, then release the RST button, while holding down the MODE button.  The LED should begin flashing yellow.  Continue holding down the MODE button until you see the Core change from flashing yellow to flashing white.  Then release the button.  The Core should begin [flashing blue](https://v.cdn.vine.co/r/videos/E465A8959B1015390893882101760_178fcfd2b3c.4.3.11510817618992331600_MIW9HE1mtZ9H_SpBlKdK1lv2UfmniExCFQHrgJ7iqiFDUiDb0E31bR7GwvB_7wz0.mp4?versionId=eS01KUZ6NaUZgEipSDeVi0rxZENByp1N) after the factory reset is complete.
6. Try manually re-running the patch programmer to update the CC3000’s firmware over USB.  You can find detailed instructions [here](https://community.sparkdevices.com/t/failed-connecting-to-wifi/648/53).  
7. If none of the above are successful, please [contact the Spark team](mailto:hello@sparkdevices.com) and provide us with the brand and model number of your access point.

---

## Flashing yellow

- *What’s the Core doing?* My Core is starts flashing yellow when I plug it or when I hit the RST button.
- *What’s the problem?* Your Core is missing important firmware.
- *How do I fix it?*

Please complete the following steps:
  
1. Try hitting the RST button to make sure you did not accidentally configure your Core into DFU mode.
2. Try a factory reset.  Hold down both buttons, then release the RST button, while holding down the MODE button.  The LED should begin flashing yellow.  Continue holding down the MODE button until you see the Core change from flashing yellow to flashing white.  Then release the button.  The Core should begin [flashing blue](https://v.cdn.vine.co/r/videos/E465A8959B1015390893882101760_178fcfd2b3c.4.3.11510817618992331600_MIW9HE1mtZ9H_SpBlKdK1lv2UfmniExCFQHrgJ7iqiFDUiDb0E31bR7GwvB_7wz0.mp4?versionId=eS01KUZ6NaUZgEipSDeVi0rxZENByp1N) after the factory reset is complete.
3. If a factory reset is unsuccessful, then we have to write the firmware over DFU.  You can accomplish this by following the steps below:

Install dfu-util for your system either using homebrew on a mac, http://dfu-util.gnumonks.org/ on windows, or you can build from source on linux:
        
    opkg install libusb-1.0-dev
    wget http://dfu-util.gnumonks.org/releases/dfu-util-0.7.tar.gz
    tar xvf dfu-util-0.7.tar.gz
    cd dfu-util-0.7
    ./configure
    make
    sudo make install

---

If you install those you should be able to run, with your core connected over USB:
        
    sudo dfu-util -l

---

This should give you a list with something like [1d50:607f] in the list, if that's the case, then we can install the missing firmware (can be found here: https://s3.amazonaws.com/spark-website/factory_firmware.bin)

    dfu-util -d 1d50:607f -a 1 -s 0x00020000 -D factory_firmware.bin
    dfu-util -d 1d50:607f -a 0 -s 0x08005000:leave -D factory_firmware.bin

You can reboot your Core and it should start [slow flashing blue](https://v.cdn.vine.co/r/videos/E465A8959B1015390893882101760_178fcfd2b3c.4.3.11510817618992331600_MIW9HE1mtZ9H_SpBlKdK1lv2UfmniExCFQHrgJ7iqiFDUiDb0E31bR7GwvB_7wz0.mp4?versionId=eS01KUZ6NaUZgEipSDeVi0rxZENByp1N), or start [flashing green](https://mtc.cdn.vine.co/r/videos/DB9E0E87311015399731217969152_1d6c83d12a3.4.3.2795910212236322177_4RBA9frM0a4pwIG_RbZgo.ZOBEbBr_CpxzoOsBNuExDz6TFldcjJSYHVh203e6F4.mp4?versionId=orM0m0DvLYdciAwsb6DYHhqb974AHMj_) if everything worked.

If none of these steps are successful, please [contact the Spark team](mailto:hello@sparkdevices.com).

---

## Flashing orange (red/yellow)

- *What’s the Core doing?* My Core is flashing yellow/red/orange lights after it connects to Wi-Fi.
- *What’s the problem?* A decryption error occurred during the handshake with the Spark Cloud
- *How do I fix it?*

Please complete the following steps:

1. A full set of instructions for resolving this issue can be found at the following location on the Spark Community forums.  If the steps included in the link below are unsuccessful, please [contact the Spark team](mailto:hello@sparkdevices.com).

[Replacing your Spark Cloud credentials >](https://community.sparkdevices.com/t/troubleshooting-my-core-is-flashing-yellow-red-lights-after-it-connects-to-wifi/627)

---

## Flashing green then red

- *What’s the Core doing?* My Core starts flashing green to connect to my network, then the LED turns red.
- *What’s the problem?* Your Core is facing a networking issue and cannot connect to the Cloud.
- *How do I fix it?*

There are two potential failure modes here--either your home network does not have a working internet connection, or we are having issues with our servers. 

1. Try power cycling your router to resolve any transient networking hiccups in your home Wi-Fi network
2. Try going to a website like [Google](http://www.google.com/) on your computer or laptop to verify that your Wi-Fi network is connected to the internet and is capable of serving up web pages
3. Check www.spark.io/status to see if there is a known issue with the Spark Cloud
4. If you’re still seeing this issue, please [contact the Spark team](mailto:hello@sparkdevices.com).

---

## Main LED off, small blue LED dim

- *What’s the Core doing?* The main LED on my Spark Core is off, but the small blue LED in the upper right corner is dimly glowing.
- *What’s the problem?* Your Core is missing firmware.
- *How do I fix it?*

1. Try a factory reset.  Hold down both buttons, then release the RST button, while holding down the MODE button.  The LED should begin flashing yellow.  Continue holding down the MODE button until you see the Core change from flashing yellow to flashing white.  Then release the button.  The Core should begin after the factory reset is complete.
2. If you see no flashing lights during factory reset, then your Core may be temporarily nonfunctional.  If you have a JTAG shield, [contact the Spark team](mailto:hello@spark.io) so we can help walk you through re-installing the Core firmware.  If you do not have a JTAG shield, please [contact the Spark team](mailto:hello@spark.io) to let us know, and we’ll help you take next steps.

## LEDs off and unresponsive

- *What’s the Core doing?* My Core isn’t showing any LED activity when I power it over USB.
- *What’s the problem?* Your Core is not receiving power.
- *How do I fix it?*

Please complete the following steps:
  
1. Try powering the Core with a different USB cable and power supply (different USB port on your computer, for example)
2. If a different USB cable and power supply does not fix the issue, your Core may have a hardware short. Please [contact the Spark team](mailto:hello@spark.io) for further debugging.


APPENDIX
===

## DFU Mode (Device Firmware Upgrade)

If you are wish to program a Core with a custom firmware via USB, you'll need to use this mode. This mode triggers the on-board bootloader that accepts firmware binary files via the dfu-utility.

Procedure:

Hold down both buttons, then release the RST button, while holding down the MODE button. Release the MODE button as soon as the LED starts flashing yellow. The Core now is in the DFU mode.


<iframe class="vine-embed" src="https://vine.co/v/MahhI1Fg7O6/embed/simple" width="320" height="320" frameborder="0"></iframe>


## Factory Reset

A factory reset restores the firmware on the Core to the default Tinker app and clears all your WiFi credentials. 

Procedure: 

The procedure is same as the one described above (DFU Mode), but in this case you should continue holding down the MODE button until you see the Core change from flashing yellow to flashing white. Then release the button.  The Core should begin after the factory reset is complete.

**Note:** The video here is a continuation of the video from above (DFU Mode).

<iframe class="vine-embed" src="https://vine.co/v/MahOmIaX2xP/embed/simple" width="320" height="320" frameborder="0"></iframe>
