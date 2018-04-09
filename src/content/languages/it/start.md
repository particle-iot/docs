Come iniziare
=====

### Cosa c'è nella scatola

![Spark Core in box](/assets/images/core-in-box.jpg)

Congratulazioni per essere i nuovi proprietari di un nuovissimo Spark Core! Andate avanti, aprite la scatola e vediamo cosa trovate. La scatola dovrebbe contenere:

- *Uno Spark Core*. La ragione per cui ll'avete comperato. Andremo più in profondità fra poco.
- *Una breadboard*. La basetta sperimentale rende più semplice collegare i componenti al Core senza saldare. Internamente le righe lungo i bordi sono collegate orizontalmente mentre le colonne interne, verticalmente. Vedi  [l'articolo Breadboard su Wikipedia](http://it.wikipedia.org/wiki/Breadboard) per maggiori informazioni.
- *Un cavo USB*. Il cavo USB incluso è usato per due scopi: per alimentare lo Spark Core (collegandolo al vostro PC, ad un aimentatore USB o ad un pacco di batterie USB) e per riprogrammarlo. La maggior parte delle volte riprogrammerete il Core tramite il Cloud ma avrete sempre la possibilità di programmarlo via USB, specialmente se la connessione internet non è disponibile o se preferite usare i vostri server.


### Passo 1: Alimentare il Core

![Alimentare il Core](/assets/images/core-usb.jpg)

Alimentare il Core è facile; riceve corrente via una porta Micro USB come molti smartphone e altri apparecchi. Alimentate il vostro Core collegando il cavo Micro USB alla porta USB del Core e l'altra parte del cavo alla porta USB del vostro computer, ad un hub USB (preferibilmente con alimentazione) o ad un alimentatore USB (come quello che avete ricevuto col vostro smartphone).

Se desiderate, potete anche alimentare il Core con una sorgente da 3.6V fino a 6V collegata al pin `VIN`, o con 3.3V al pin `3.3V`.

### Passo 2: Scaricamento dell'applicazione Spark iOS o Android

![Spark apps](/assets/images/spark-apps.png)

L'applicazione Spark mobile è il modo più semplice per connettere il vostro Spark Core ad internet. L'applicazione vi aiuta a fare tre cose:

- Creare un account con Spark
- Connettere il vostro Spark Core alla vostra rete Wi-Fi
- Controllare il vostro Core senza scrivere una riga di codice

L'applicazione iOS necessita iOS 7, l'applicazione Android lavora con Ice Cream Sandwich (Android 4.0) e più recenti.

[Scarica l'applicazione iPhone >](https://itunes.apple.com/us/app/spark-core/id760157884)

[Scarica l'applicazione Android >](https://play.google.com/store/apps/details?id=io.spark.core.android)



### Passo 3: Collegare il Core alla rete Wi-Fi

![Smart Config](/assets/images/smart-config.png)

Connettere lo Spark Core al vostro Wi-Fi è molto semplice. Infatti, io l'ho fatto due volte scrivendo questo paragrafo!

L'applicazione Spark mobile vi guiderà in questo processo, ma praticamente è un solo passo dove dovrete inserire il nome della rete Wi-fi (SSID) e la password e questi verranno inviati via Wi-Fi allo Spark Core che, automaticamente, si collegherà alla rete e allo Spark Cloud. Se tutto funziona come deve, vedrete il LED passare da questi colori:

- **Blu lampeggiante**: in attesa delle credenziali del Wi-Fi
- **Verde lampeggiante**: in connessione alla rete Wi-Fi
- **Ciano lampeggianten**: in connessione allo Spark Cloud
- **Magenta lampeggiante**: aggiornamento al nuovo programma
- **Ciano pulsante**: Connesso!

<div id="core1" class="core"><div class="core-butt"></div><div class="rgb"><div class="pattern"></div></div></div>

<a id="button1" class="button" onclick="animateCore()">Vedi un'animazione</a>

Se l'applicazione mobile non va bene per voi, potete collegare lo Spark Core via USB. Per maggiori informazioni o per una spiegazione dettagliata su come collegare il Core alla rete, vedi:

[Collega il tuo Core >](/#/connect)

### Passo 4: Fare lampeggiare un LED con Tinker

![Tinker](/assets/images/tinker.png)

L'applicazione Spark mobile contiene una mini-applicazione chiamata Tinker che vi permette di ... appunto, tinker, cioè armeggiare. Vi permette di parlare con i pins di Input/Output dello Spark Core senza scrivere una singola riga di codice.

Ognuno dei pins ha quattro possibili funzioni: *digitalWrite*, *analogWrite*, *digitalRead*, e *analogRead*. Per maggiori informazioni, scorrere in basso alla sezione "Armeggiare con Tinker".

### Passo 5: Scrivere applicazioni con Spark Build

![Spark Build](/assets/images/ide.png)

Quando sarete stufi di leggere dati dai sensori e far lampeggiare dei LED, andate sulla Spark Build IDE per il vero spettacolo.  Spark Build vi permette di creare e caricare applicazioni personali sul vostro Core partendo da qualsiasi web browser moderno e di equipaggiare il vostro Core con tutte le possibilità di Internet!  Wow!  

Non siate nervosi--abbiamo preparato un sacco di applicazioni di esempio e di librerie approvate dalla comunità che vi permetteranno di partire col piede giusto. Per saperne di più, controllate la sezione "Scrivere applicazioni con Spark Build" più in basso in questa pagina.


Aspetta, cos'è questa cosa?
=====

Lo Spark Core è un kit di sviluppo Wi-Fi per hardware connesso ad internet. È il "cervello" di un progetto o prodotto connesso a internet.

Il Core contiene un microprocessore che è un piccolo computer, non costoso e a basso consumo che può eseguire un'applicazione unica. Il microprocessore fa lo show; esegue il tuo programma e dice al resto del Core cosa fare. Non ha un sistema operativo come il vostro computer; esegue solamente un'applicazione (spesso chiamata *firmware* o *embedded application*), che può essere semplice, di poche righe di codice o molto complessa, a seconda di quello che volete fare.

I microprocessori sono particolarmente bravi a *controllare cose*. Hanno diversi "pins" (delle piccole gambine che escono dal chip) che sono chiamate *GPIO* (General Purpose Input and Output) pins, o I/O pins. Possono essere collegati a sensori o bottoni per percepire il mondo, o collegati a luci e motori per interagire con esso. Questi pins del microprocessore sono stati direttamente collegati con i connettori sui lati del Core in modo da potervi accedere facilmente; specialmente i pins chiamati da D0 a D7 e da A0 a A7 sono direttamente collegati con i pins GPIO del microprocessore.

Il microprocessore può inoltre comunicare con altri chips usando protocolli standard, tipo *Serial* (anche chiamato UART), *SPI*, o *I2C* (anche chiamato Wire). Il Core può essere reso più performante connettendolo con dei chips con compiti speciali tipo driver per motori o shift registers. Ogni tanto questi chips sono integrati su un *Shield*, un acessorio del Core che permette di estendere il Core. 

Il Core ha inoltre un modulo Wi-Fi che lo connette alla vostra rete Wi-Fi locale nello stesso modo in cui il vostro computer o smartphone si connettono ad una rete Wi-Fi. Il Core è programmato in modo da restare sempre connesso ad internet per default, fintanto che trovi e possa connettersi ad una rete.

Quando il Core si connette a internet, stabilisce una connessione con lo *Spark Cloud*. Connettendosi con il Cloud, il Core diventa acessibile da qualsiasi luogo tramite una semplice REST API. Questa API è concepita per fare in modo che sia molto facile connettersi al Core tramite una applicazione web o mobile in modo sicuro e privato per far sì che solo voi e quelli di cui vi fidate possano accedere al Core.

### Bottoni

Ci sono due bottoni sul Core: il bottone `{{reset-button}}` (sulla destra) e il bottone `{{system-button}}` (sulla sinistra). 

Con il bottone `{{reset-button}}` si esegue un hard reset, proprio togliendo e rimettendo l'alimentazione al microprocessore. Questo è il modo migliore per far ripartire l'applicazione che avete caricato nel Core. Questo è il modo migliore per far ripartire l'applicazione che avete scaricato sul Core.

Il bottone `{{system-button}}` serve ha tre funzioni:

- Tenendo premuto il bottone `{{system-button}}` per tre secondi il Core entra in modalità *Smart Config* per connetterlo alla vostra rete Wi-Fi locale. Il LED dovrebbe cominciare a lampeggiare blu.
- Tenere premuto il bottone `{{system-button}}` per dieci secondi permette di cancellare la memoria delle reti Wi-Fi del Core.
- Tenendo premuto il bottone `{{system-button}}` e premendo una volta il bottone `{{reset-button}}` e aspettando per *tre secondi* il Core entra in modalità *Bootloader*, dove potete riprogrammare il Core via USB o JTAG. Lasciare il bottone quando il LED lampeggia giallo. Se avete fatto tutto questo per errore, semplicemente premere il bottone `{{reset-button}}` per lasciare la modalità *Bootloader*.
- Tenendo premuto il bottone `{{system-button}}` e premendo una volta il bottone `{{reset-button}}` e aspettando per *dieci secondi* si effettua un *Factory Reset*, dove il Core viene riprogrammato con il software caricato in fabbrica (l'applicazione Tinker). Il LED dovrebbe diventare bianco per tre secondi e poi lampeggiare velocemente; quando il LED cambia su un altro colore il Core è stato inizializzato. Questa operazione è utile se avete problemi col il vostro firmware o se semplicemente volete tornare a Tinker.


### LEDs

Ci sono due LEDs sul Core. Quello più grande in mezzo è un LED RGB che fa vedere lo stato della connessione internet del Core. L'altro piccolo LED blu è il LED *LED utente*; è collegato al pin D7 e quindi quando impostate D7 a `HIGH` o `LOW`, si accende, rispettivamente si spegne.

Il LED RGB può indicare i seguenti stati:

- *Blu lampeggiante*: Modo in ascolto, in attesa delle informazioni della rete.
- *Blu fisso*: Smart Config completata, informazioni di rete trovate.
- *Verde lampeggiante*: In connessione con la rete locale Wi-Fi.
- *Ciano lampeggianten*: In connessione allo Spark Cloud.
- *Ciano pulsante*: Connesso con successo allo Spark Cloud.
- *Giallo lampeggiante*: Modo Bootloader, in attesa del nuovo codice via USB o JTAG.
- *Bianco lampeggiante*: Factory Reset inizializzato.
- *Bianco fisso*: Factory Reset completato; riavvio.

Il LED RGB serve anche ad indicare se ci sono stati errori durante la connessione a internet. *Il LED rosso indica un errore.* Gli errori possono includere:

- *Due flash rossi*: Errore di connessione dovuto ad una non buona connessione internet. Controllare la connessione internet.
- *Tre flash rossi*: Il Cloud non è accessibile ma la connessione internet è buona. Controllare il nostro [Feed Twitter](http://www.twitter.com/sparkdevices) per vedere se ci sono annunciati dei problemi; se non ci sono visitare la [pagina di supporto](https://www.sparkdevices.com/support) per ricevere aiuto.
- *Quattro flash rossi*: Il Cloud è stato raggiunto ma lo scambio di informazioni di sicurezza è fallito. Visitate la nostra [pagina di supporto](https://www.sparkdevices.com/support) per ricevere aiuto.
- *Lampeggio giallo/rosso*: Credenziali non valide per lo Spark Cloud. Contattare lo Spark Tteam (<a href="mailto@hello@particle.io">hello@particle.io</a>).

### Pins

Il Core ha 24 pins a cui si può collegare un circuito. Questi pins sono:

- _VIN_: Collegate qui un'alimentazione non regolata tra 3.6V e 6V per alimentare il Core. Se si alimenta il Core via USB, questo pin *non* deve essere usato.
- _3V3_: Questo pin fornisce una tensione regolata di 3.3V che può essere usata per alimentare delle componenti esterne al Core (Se avete la vostra alimentazione regolata di 3.3V la potete collegare qui per alimentare il Core).
- _3V3*_: Questa è una alimentazione regolata a basso disturbo di 3.3V da usare per circuiti analogici che potrebbero essere sensibili ai disturbi delle componenti digitali. Se usate dei sensori analogici sensibili alimentateli dal pin _3V3*_ invece che dal _3V3_.
- _!RST_: Potete inizializzare il Core (come premendo il tasto `{{reset-button}}`) connettendo questo pin a massa (GND).
- _GND_: Questi pins sono collegati a massa.
- _D0 a D7_: Questi sono il pane e il burro dello Spark Core: 8 GPIO (General Purpose Input/Output) pins. Sono indicati con "D" perchè sono pins digitali, cioè non possono leggere i valori di sensori analogici. Alcuni di questi mettono a disposizione delle periferiche aggiuntive (SPI, JTAG, etc.), vedi più avanti per maggiori informazioni.
- _A0 a A7_: Questi pins sono 8 GPIO in più che portano il totale a 16. Questi pins sono come quelli da D0 a D7, ma sono "Analogici", cioè possono leggere i dati dai sensori analogici (tecnicamente hanno una periferica ADC). Come per i pins digitali anche questi hanno delle periferiche aggiuntive.
- _TX and RX_: Questi pins sono per la comunicazione via seriale/UART. TX rappresenta il pin di trasmissione e RX quello di ricezione.

#### Pins PWM

Quando volete usare la funzione `analogWrite()` nel Core, per esempio per regolare la luminosità di LEDs, dovete usare dei pins che hanno una periferica con timer. Questi pins vengono generalmente chiamati pins PWM perchè quello che fanno è chiamata Pulse Width Modulation.  Il Core ha 8 pins PWM: A0, A1, A4, A5, A6, A7, D0 e D1.

Lo Spark Cloud
---

Lo Spark Cloud è una rete di servers presso `https://api.particle.io/` dove il vostro Core si collega quando è collegato a internet.

Il Cloud esiste per tre ragioni principali:

### Semplicità

Parlando in generale, quando si lavora in un sistema incorporato (embedded system) networking significa inviare bytes tramite sockets TCP e datagrams UDP. Sono tutti daccordo che la programmazione UDP non è divertente. La comunicazione a livelli più alti è difficile perchè i microprocessori hanno così poca memoria che non possono generalmente ospitare un server web HTTP tradizionale. Il Cloud vi da la semplicità del server web con i costi e la potenza ridotti di un microprocessore facendo da tramite tra la comunicazione web (richieste HTTP) e quella incorporata (embedded), nel nostro caso messaggi CoAP criptati).

Ma non è necessario sapere tutto questo. Il bello del Cloud è che tutto questo è astratto. Non dovete sapere *come* il Core si connette ad internet; semplicemente lo fa. E una volta che è connesso gli potete far fare cose grandiose velocemente e facilmente, senza occuparvi di sockets.

### Disponibilità globale

Per default, se connettete qualcosa alla vostra rete Wi-Fi, questa è accessibile solamente internamente alla rete locale. Questo è dovuto al fatto che si è a corto di indirizzi IP ed è anche una misura di sicurezza, visto che ciò non permette a persone qualsiasi di accedere alla vostra rete ed immischiarsi nei fatti vostri.

Rendere disponibile le vostre cose al di fuori della rete locale non è evidente e normalmente richiede operazioni speciali tipo mapping delle porte e indirizzi IP statici. Anche se siete tecnicamente preparati per maneggiare tutto ciò, se sviluppate un prodotto non volete che essere ferrati con OpenWRT sia un presupposto per l'acquisto di esso.

Evitiamo tutto questo con il Cloud. Il Core si connette con il Cloud appena è sulla vostra rete Wi-Fi e mantiene una connessione con esso sempre aperta. Questo significa che è raggiungibile sempre e da ogni parte del mondo.

Ma un momento, se le reti locali sono una misura di sicurezza, questo non vi espone a ogni sorte di problemi? Beh, certo potrebbe ma ...

### Sicurezza

Sì, esatto. Ci abbiamo pensato!

La sicurezza è difficile. Specialmente in un sistema embedded visto che il criptaggio è molto affamato di risorse. Ma è anche molto importante perchè non volete certo che qualcuno accenda e spenga le vostre luci, o peggio ancora, che apra e chiuda le vostre porte.

Abbiamo selezionato una serie di protocolli di sicurezza molto solidi che sono sicuri ed efficenti in modo da funzionare bene in un sistema embedded. Sono integrati nel protocollo Spark, che è open source e pronto per essere esteso ad altri prodotti.


Armeggiare con "Tinker"
======
L'applicazione Tinker
---

![Tinker](/assets/images/tinker.png)

La sezione Tinker dell'applicazione Spark mobile rende molto semplice cominciare a giocare con lo Spark Core senza bisogno di scrivere del codice. È l'ideale per l'inizio dello sviluppo e spesso potrà fare tutto il necessario per far partire il vostro progetto.

L'applicazione consiste in 16 pins in colonne verticali - 8 pins analogici sulla sinistra, 8 pins digitali sulla destra. Questi pins rappresentano i 16 pins GPIO (General Purpose Input and Output) dello Spark Core e sono organizzati nello stesso modo.

![Tinker selection](/assets/images/tinker-select.png)

Per cominciare tocca uno dei pins. Apparirà un menu con le funzioni a disposizione. Ogni pin può avere quattro funzioni:

- **digitalWrite**: Mette il pin a HIGH o LOW, connettendolo a 3.3V (la tensione massima del sistema) rispettivamente a GND (massa). Il pin D7 è collegato al LED interno; se mettete il pin D7 a HIGH, il LED si accende mentre se lo mettete a LOW, si spegne.
- **analogWrite**: Mette il pin ad un valore tra 0 e 255, dove 0 è come LOW e 255 come HIGH. Questo è come inviare una tensione tra 0 e 3.3V sul pin, ma essendo il sistema digitale, viene usato un meccaniscmo chiamato Pulse Width Modulation, o PWM. Per esempio potete usare *analogWrite* per cambiare l'intensità ad un LED.
- **digitalRead**: Legge il valore digitale del pin, che può essere HIGH o LOW. Se avete collegato il pin a 3.3V, la lettura sarà HIGH; se lo connettete a massa (GND) sarà LOW. Per valori intermedi la lettura sarà il valore più vicino ma pericolosamente non ben definito.
- **analogRead**: Legge il valore analogico di un pin, che è un valore tra 0 e 4095 dove 0 è LOW (GND) e 4095 è HIGH (3.3V). Tutti i pin analogici (da A0 a A7) possono usare questa funzione. *analogRead* è l'ideale per leggere i dati dai sensori.

Per cambiare la funzione semplicemente rimanere sul pin e riapparirà il menu per la selezione delle funzioni. Avete altre domande? Contattateci sui [forums!](https://community.sparkdevices.com/)

Il firmware Tinker
---

Il firmware Tinker é l'applicazione che viene installata di partenza sullo Spark Core quando esce dalla linea di produzione della fabbrica. Potete sempre tornare a questa applicazione mettendo il Core nel modo [factory reset](#bottoni), o ricaricando il Core con Tinker nell'applicazione Spark mobile.

L'applicazione Tinker è un bel esempio di come creare un'applicazione potente senza troppo codice. Potete dare un'occhiata all'ultima versione [qui.](https://github.com/particle-iot/core-firmware/blob/master/src/application.cpp)

La API Tinker
---

Quando il firmware Tinker è installato sul vostro Spark Core risponderà a delle richieste API dalla vostra applicazione mobile, che rispecchia le quattro funzioni GPIO di base (digitalWrite, analogWrite, digitalRead, analogRead). Queste richieste API possono essere fatte da altre applicazioni, così potete creare le vostre applicazioni web o mobile attorno al firmware Tinker.

### digitalWrite

Mette il pin a HIGH o LOW, cioè lo connette a 3.3V (la tensione massima del sistema) o a GND (massa). Il pin D7 è collegato al LED interno; se mettete il pin D7 a HIGH, il LED si accende mentre se lo mettete a LOW, si spegne.

    POST /v1/devices/{DEVICE_ID}/digitalwrite

    # ESEMPIO DI RICHIESTA NEL TERMINALE
    # Core ID è 0123456789abcdef01234567
    # Il tuo token di accesso è 1234123412341234123412341234123412341234
    curl https://api.particle.io/v1/devices/0123456789abcdef01234567/digitalwrite \
      -d access_token=1234123412341234123412341234123412341234 -d params=D0,HIGH

I parametri devono essere il pin (A0 a A7, D0 a D7), seguito da HIGH o LOW, separati da una virgola. Il valore di ritorno sarà 1 se la scrittura ha avuto successo e -1 in caso di non riuscita.


### analogWrite

Mette il pin ad un valore tra 0 e 255, dove 0 è come LOW e 255 come HIGH. Questo è come inviare una tensione tra 0 e 3.3V sul pin, ma essendo il sistema digitale, viene usato un meccaniscmo chiamato Pulse Width Modulation, o PWM. Per esempio potete usare *analogWrite* per cambiare l'intensità ad un LED.

    POST /v1/devices/{DEVICE_ID}/analogwrite

    # ESEMPIO DI RICHIESTA NEL TERMINALE
    # Core ID è 0123456789abcdef01234567
    # Il tuo token di accesso è 1234123412341234123412341234123412341234
    curl https://api.particle.io/v1/devices/0123456789abcdef01234567/analogwrite \
      -d access_token=1234123412341234123412341234123412341234 -d params=A0,215

I parametri devono essere il pin (A0 a A7, D0 a D7), seguito da un valore integer da 0 a 255, separati da una virgola. Il valore di ritorno sarà 1 se la scrittura ha avuto successo e -1 in caso di non riuscita.


### digitalRead

Legge il valore digitale del pin, che può essere HIGH o LOW. Se avete collegato il pin a 3.3V, la lettura sarà HIGH; se lo connettete a massa (GND) sarà LOW. Per valori intermedi la lettura sarà il valore più vicino ma pericolosamente non ben definito.

    POST /v1/devices/{DEVICE_ID}/digitalread

    # ESEMPIO DI RICHIESTA NEL TERMINALE
    # Core ID è 0123456789abcdef01234567
    # Il tuo token di accesso è  1234123412341234123412341234123412341234
    curl https://api.particle.io/v1/devices/0123456789abcdef01234567/digitalread \
      -d access_token=1234123412341234123412341234123412341234 -d params=D0


Il parametro deve essere il pin (A0 a A7, D0 a D7). Il valore di ritorno sarà 1 se il pin è HIGH, 0 se è LOW e -1 in caso di lettura non riuscita.


### analogRead

Legge il valore analogico di un pin, che è un valore tra 0 e 4095 dove 0 è LOW (GND) e 4095 è HIGH (3.3V). Tutti i pin analogici (da A0 a A7) possono usare questa funzione. *analogRead* è l'ideale per leggere i dati dai sensori.

    POST /v1/devices/{DEVICE_ID}/analogread

    # ESEMPIO DI RICHIESTA NEL TERMINALE
    # Core ID è 0123456789abcdef01234567
    # Il tuo token di accesso è  1234123412341234123412341234123412341234
    curl https://api.particle.io/v1/devices/0123456789abcdef01234567/analogread \
      -d access_token=1234123412341234123412341234123412341234 -d params=A0

Il parametro deve essere il pin (A0 a A7, D0 a D7). Il valore di ritorno sarà tra 0 e 4095 se la lettura è riuscita e -1 se è fallita.


Caricare applicazioni con lo Spark Build
===

Cosa è un firmware?
---

Un *sistema embedded* come lo Spark Core non ha un sistema operativo come un computer tradizionale. Al suo posto può girare una singola applicazione chiamata spesso *firmware*, che viene eseguita ogni volta che si accende il sistema.

Viene chiamato *Firmware* perchè è più duro di software e più morbido di hardware. L'Hardware è fissato durante la produzione e non cambia. Il Software può essere aggiornato ogni volta, quindi è molto flessibile. Il Firmware è qualcosa in mezzo; le ditte di hardware fanno degli aggiornamenti del firmware ma non molto frequentemente perchè l'aggiornamento del firmware può essere difficoltoso.

Nel nostro caso, visto che lo Spark Core è connesso ad internet, aggiornare il firmware è alquanto triviale; lo mandiamo via rete e abbiamo la sicurezza che non possiate "bloccare" il Core.

Quando aggiornate il codice sullo Spark Core facciamo un cosidetto *aggiornamento firmware via etere*. Questo aggiornamento firmware sovrascrive praticamente tutto il software sullo Spark Core; l'unica cosa che non viene toccata è il bootloader, che gestisce il processo di caricamento del nuovo firmware e assicura che possiate sempre aggiornare il firmware via USB o con un factory reset. (Metteremo il bootloader open source appena avremo aggiornato il README)

Annunciarsi allo Spark Build
---
Quando siete pronti a riprogrammare il vostro Spark Core, andate sulla nostra IDE:

[Particle Build >](https://www.particle.io/build)

![Spark Build](/assets/images/create-account.jpg)

Creare un account in un semplice passo. Quando si presenta la schermata di login, mettete semplicemente il vostro indirizzo email (con cura!) e la parola d'ordine desiderata. Premete l'amichevole bottone "Sign Up" e raggiungerete la pagina iniziale dello Spark Build.

![Spark Build](/assets/images/log-in.jpg)

Se vi siete già annunciati nello Spark Core, premete sul testo "Let me log in" vicino al bottone di Sign Up e vi troverete una finestra di login per utenti registrati. Non preoccupatevi se per errore avete premuto su "Sign Up" pur avendo già un account, verrete annunciati con il vostro account esistente.

Spark Build, il nostro web IDE
---

![Spark Build](/assets/images/ide.png)

Spark Build è un ambiente integrato di sviluppo (Integrated Development Environment) detto IDE; questo significa che potete sviluppare software in una appicazione semplice da usare che gira sul vostro web browser.

Spark Build parte con la barra di navigazione sulla sinistra. In alto ci sono tre bottoni che servono a tre importanti funzioni:

- **Flash**: Invia il codice allo Spark Core. Questo inizializza un *aggiornamento firmware via etere* e carica il nuovo software sullo Spark Core.
- **Verify**: Compila il vostro codice senza inviarlo al Core; se ci sono degli errori nel codice, verranno visualizzati nella console di debugging in fondo allo schermo.
- **Save**: Salva i cambiamenti fatti nel codice.

In basso a sinistra ci sono altri quattro bottoni per navigare nella IDE:

- **Code**: Mostra una lista delle vostre applicazioni e vi lascia scegliere quale modificare/caricare.
- **Docs**: Vi porta alla documentazione per lo Particle.
- **Cores**: Mostra una lista dei vostri Spark Cores in modo da scegliere quale aggiornare e vi da più informazioni su ogni Core.
- **Settings**: Per cambiare la password, fare log out o creare il token di accesso per le chiamate API.

Applicazioni e librerie Spark
---

![Spark Build](/assets/images/spark-apps.jpg)

Il cuore dello Spark Build è la sezione "Spark Apps", che vi mostra il nome dell'applicazione corrente nell'editor come pure una lista delle vostre altre applicazioni così come quelle di esempio supportate dalla comunità.

L'applicazione che avete aperta nell'editor è mostrata sotto "Current App". Noterete che l'applicazione di esempio "HELLOWORLD" ha solo un file, ma firmware con associate librerie e/o files multipli sono completamente supportati. 
Da questo pannello avete a disposizione un sacco di bottoni e azioni che vi potranno aiutare a far crescere e a gestire le vostre applicazioni:

- **Create**: Potete creare nuove applicazioni premendo il bottone "Create New App". Date un nome e premete invio! La vostra applicazione è salvata nel vostro account e pronta per essere modificata.

- **Delete**: Premete il bottone "Remove App" per cancellare definitivamente l'applicazione dalla vostra libreria Particle.

- **Rename**: Potete rinominare la vostra applicazione Spark semplicemente facendo doppio click sul titolo della vostra applicazione sotto "Current App".  Potete modificare il campo descrizione "Optional description" nello stesso modo.
- **My Apps**: Stanchi di lavorare al vostro progetto attuale? Selezionate il nome di un'altra applicazione sotto "My apps" per aprirla in una cartella dell'editor dello Spark Build.

- **Files**: Visualizza tutti i files conosciuti associati con l'applicazione aperta. Premete su un file di supporto nella vostra applicazione per aprirlo come cartella attiva nell'editor.

- **Examples**: La lista "Example apps" mostra il numero costantemente crescente delle applicazioni di esempio supportate dalla comunità. Usate queste applicazioni come riferimento per sviluppare le vostre o modificatele per estendere la loro funzionalità.


Caricare la vostra prima applicazione
---

Il modo migliore per cominciare con la IDE è cominciare a scrivere del codice:

- **Connect**: Assicuratevi che il vostro Core sia acceso e che stia "pulsando" in ciano che indica che è connesso allo Spark Cloud e pronto per essere aggiornato.

- **Get Code**: Provate a schiacciare sull'esempio "Blink an LED" sotto "Example apps". L'editor dello Spark Build dovrebbe mostrare il codice dell'esempio nella cartella attiva. Alternativamente potete copiare ed incollare il codice in una nuova applicazione nella Build IDE.

```
//D7 LED Flash Example
int LED = D7;

void setup() {
   	pinMode(LED, OUTPUT);
}

void loop() {
   	digitalWrite(LED, HIGH);
   	delay(1000);
   	digitalWrite(LED, LOW);
   	delay(1000);
}
```

![Spark Build](/assets/images/select-a-core.jpg)

- **Select Your Core**: Il prossimo passo è assicurarsi di aver scelto il Core giusto dove caricare l'applicazione. Cliccate sull'icona "Cores" in basso a sinistra della finestra di navigazione e cliccate sulla stella vicino al Core che volete aggiornare. Una volta selezionato la stella associata diventerà gialla.

- **Flash**: Premete il bottone "Flash" e il vostro codice sarà inviato in modo wireless al vostro Core. Se il caricamento avrà successo il LED sul Core comincerà a lampeggiare color magenta.

![Spark Build](/assets/images/fork-app.jpg)

- **Fork**: Vorreste che il ritmo del lampeggio del LED fosse più veloce? Premete sul bottone "Fork This Example" dopo aver selezionato l'esempio "Blink An LED". Avrete ora una copia personale dell'applicazione che potete modificare, salvare e caricare su tutti i vostri Cores.

- **Edit**: Provate a modificare il valore nella funzione delay() da 1000 a 250, che cambia l'intervallo da 1000 millisecondi a solo 250 millisecondi. Premete il bottone Verify e poi il bottone Flash. Il LED del Core lampeggia più velocemente? Ben fatto :)

Informazioni Account
---

Ci sono diversi altri sviluppi e miglioramenti nello Spark Build. La Spark Build IDE è il miglior utensile per vedere informazioni importanti del vostro Core, gestire i Cores associati al vostro account Spark e dissociarli in modo che possano essere trasferiti ai vostri amici.

![Spark Build](/assets/images/device-id.jpg)

- **Core ID**: Potete visualizzare il Device ID del vostro Core cliccando sull'icona "Cores" in basso al pannello di navigazione e poi sulla freccina verso il basso vicino al Core di vostro interesse.  

- **Unclaim**: Potete dissociare un Core premendo il bottone "Remove Core" che si presenta dopo aver cliccato la freccia verso il basso. Una volta che un Core è stato dissociato è a disposizione per riassociarlo con un qualsiasi altro account di un utente Particle.

![Spark Build](/assets/images/access-token.png)

- **API Key**: Potete trovare la vostra attuale chiave per l'API sotto il pannello "Settings" del vostro account. Potete premere il bottone "Reset Token" per assegnare una nuova chiave al vostro account. *Notare* che dopo aver premuto questo bottone dovrete modificare tutte le credenziali API programmate in modo fisso nei vostri progetti Spark!




La Command Line di Spark
===

**Prossimamente!** Una Command line che vi permette di creare applicazioni Spark con la vostra desktop IDE, sia essa Eclipse, Sublime Text, Vim, o qualsiasi altra.

Creare una Spark web app
===

**Prossimamente!** Vi daremo istruzioni su come creare una web app su Heroku che possa parlare con uno Spark Core.

Risoluzione di problemi
===

Cosa non funziona?
---

### Il mio Core non si connette al Wi-Fi

Ci sono molte ragioni per cui il vostro Core non si collega con la vostra rete Wi-Fi. Per analizzare il problema controllate la nostra sezione per l'analisi dettagliata dei problemi di connessione:

[Perchè non si collega? >](/#/troubleshooting)

### Non riesco a parlare con il mio Core

Una volta che il vostro Core è connesso, deve essere *registrato* per essere associato al vostro account. Questo è quello che vi permette di controllare il vostro Core ed evitare che lo faccia qualcun'altro.

Se usate l'applicazione mobile per configurare il vostro Core, dovrebbe venire associato auomaticamente. Se invece collegate il vostro Core via USB, o se l'associazione non ha successo, lo potete fare manualmente.

Andate sulla nostra pagine per la connessione per imparare come farlo:

[ Associare il vostro Core >](/#/connect/claiming-your-core)

### Il mio Core non parte

Se il vostro Core non parte (il LED non si accende), ecco alcune cosa da controllare:

- Il Core riceve abbastanza alimentazione? Se non siete sicuri, collegate un apparecchio di misura al pin 3.3V e a massa (GND) e controllate che ci siano 3.3V come dovrebbe essere. Provate a collegare il Core ad un altro alimentatore.
- Sono stai danneggiati dei componenti? Controllate visivamente i due lati del Core.

### Il Core si comporta erroneamente

Se osservate dei comportamenti inaspettati nel vostro Core, ecco alcuni controlli da fare:

- Il Core riceve abbastanza alimentazione? Il Core si potrebbe comportare in modo errato se è collegato ad un hub USB non alimentato e non riceve abbastanza alimentazione. Inoltre se avete componenti che succhiano molta potenza (motori, per esempio) potreste aver bisogno di più alimentazione di quella che può fornire il vostro computer. Provate ad usare un alimentatore USB o ad alimentare con più potenza direttamente ai pins VIN o 3.3V.
- Se avete un Core u.FL, l'antenna è connessa? Siete nel raggio d'azione del router Wi-Fi?


Ulteriori risorse
===

Sviluppo Hardware
---

### Hardware per principianti

**Prossimamente!**

### Hardware avanzato

**Prossimamente!**

Sviluppo Software
---

### Software per principianti

**Prossimamente!**

### Software avanzato

**Prossimamente!**

