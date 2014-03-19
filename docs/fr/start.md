Premiers pas
=====

### Contenu de la boîte

![Le Spark Core dans sa boîte](../images/core-in-box.jpg)

Félicitations pour la possession du tout nouveau Spark Core ! Commençons par ouvrir la boîte, et parlons de ce que vous voyez. Votre boîte devrait contenir :

- *Un Spark Core*. La raison de votre achat. Nous en parlerons plus amplement ultérieurement.
- *Une plaque d'essai*. Une plaque d'essai facilite le branchement sans soudure des composants au Core. À l'intérieur, les colonnes sont connectées à l'horizontale, et les « rails » le long des bords sont connectés verticalement. Référez vous à [l'article Wikipedia correspondant](http://fr.wikipedia.org/wiki/Platine_d%27exp%C3%A9rimentation) pour plus d'information.
- *Un câble USB*. Le câble USB fourni est utilisé pour deux choses : alimenter le Spark Core (en le connectant à votre ordinateur, à une alimentation USB, ou à une batterie USB) et le reprogrammer. La plupart du temps, vous reprogrammerez la Core via le Cloud, mais vous aurez toujours la possibilité de le reprogrammer via l'USB, surtout si vous n'avez plus de connexion à Internet ou souhaitez utiliser vos propres serveurs.


### Étape 1 : Alimenter le Core

![Alimenter le Core](../images/core-usb.jpg)

Alimenter le Core est facile. Il recoit du courant à travers un port micro USB, de manière similaire à beaucoup de smartphones et autres gadgets. Alimentez votre Core en connectant le câble micro USB au connecteur USB du Core, et l'autre extrémité dans un connecteur USB de votre ordinateur, d'un hub USB (de préférence avec une alimentation externe), ou d'une alimentation USB (comme celle qui vient surement avec votre smartphone).

Si vous le souhaitez, vous pouvez aussi alimenter le Core en appliquant une tension de 3,6V à 6V sur la broche `VIN`, ou 3,3V sur la broche `3.3V`.

### Étape 2 : Télécharger l'application Spark pour iOS ou Android

![L'application Spark](../images/spark-apps.png)

L'application mobile Spark est la méthode la plus facile pour connecter votre Spark Core à Internet. L'application vous aidera à effectuer trois choses :

- Créer un compte Spark
- Connecter votre Spark Core à votre réseau Wi-Fi
- Contrôler votre Core sans écrire une seule ligne de code

L'application iOS nécessite iOS 7, and l'application Android fonctionne à partir de Ice Cream Sandwich (Android 4.0).

[Télécharger l'application iPhone >](https://itunes.apple.com/fr/app/spark-core/id760157884)

[Télécharger l'application Android >](https://play.google.com/store/apps/details?id=io.spark.core.android)



### Étape 3 : Connecter le Core au Wi-Fi

![Smart Config](../images/smart-config.png)

Connecter le Spark Core au Wi-Fi est simple comme tout. En fait, je l'ai fait deux fois tout en rédigeant ce paragraphe.

L'application mobile Spark vous guidera pendant le processus, mais c'est tout simpelment un processus en une étape où vous saisirez le nom de votre réseau Wi-Fi (SSID) et son mot de passe, et ces derniers seront envoyés via le Wi-Fi à votre Spark Core, qui se connectera automatiquement au réseau et au Spark Cloud. Si tout fonctionne comme prévu, vous verrez la LED passer par les couleurs suivantes :

- **Clignotements bleus** : En attente des informations Wi-Fi
- **Clignotements verts** : Connexion au réseau Wi-Fi
- **Clignotements cyans** : Connexion au Spark Cloud
- **Clignotements magenta** : Mise à jour du dernier firmware
- **Pulsations cyans**: Connecté !

<div id="core1" class="core"><div class="core-butt"></div><div class="rgb"><div class="pattern"></div></div></div>

<a id="button1" class="button" onclick="animateCore()">Voir l'animation</a>

Si l'application mobile ne fonctionne pas dans votre cas, vous pouvez aussi connecter votre Spark Core via USB. Pour plus d'information, ou pour une explication plus complète sur comment connecter votre Core à Internet, référez-vous à :

[Connecter votre Core >](/#/connect)

### Étape 4 : Faire clignoter une LED avec Tinker

![Tinker](../images/tinker.png)

L'application mobile Spark contient une mini-application nommée Tinker qui vous permet… et bien, de bidouiller (to tinker en anglais = bricoler, tripatouiller, bidouiller). Elle vous permet de communiquer avec les entrées / sorties du Spark Core sans écrire une seule ligne de code.

Chacune des broches possède jusqu'à fonctions : *digitalWrite*, *analogWrite*, *digitalRead*, et *analogRead*. Pour plus d'informations, descendez jusqu'à la section « Bidouiller avec Tinker ».

### Étape 5 : Écrire des applications avec Spark Build

![Spark Build](../images/ide.png)

Une fois que vous serez fatigués de lire des valeurs de capteurs et de faire clignoter des LEDs, dirigez vous vers l'IDE (environnement de développement) Spark Build pour le vrai spectacle. Spark Build vous permet de créer et flasher des applications personnelles sur votre Core depuis n'importe quel navigateur récent, et équiper votre Core avec toutes les possibilitées d'Internet ! Impressionnant !

Ne soyez pas nerveux. Nous vous avons préparé plein d'exemples validés par la communauté et de bibliothèques de fonctions qui vont permettrons de partir du bon pied. Pour en savoir plus, jetez un œil à la section « Écrire des application avec Spark Build » plus bas dans la page.

Doucement, c'est quoi ce truc ?
=====

Le Spark Core est un kit de développement Wi-Fi pour du matériel connecté à Internet. Il est, par essence, le « cerveau » d'un produit ou projet de matériel connecté à Internet.

Le Core possède un micro-contrôleur, qui est un ordinateur petit, bon marché et peu puissant (en performances et consommation d'énergie) capable de faire tourner une application unique. Le micro-contrôleur est le directeur du spectable : il fait tourner le logiciel et indique au reste du Core ce qu'il a à faire. Il ne possède pas de système d'exploitation tel que celui que fait tourner votre ordinateur; il fait simplement tourner une application unique (souvent appelée *firmware* ou *application embarquée*), qui peu être toute simple (quelques lignes de code) ou extrèmement complexe, selon ce que vous voulez faire.

Les micro-contrôleurs sont particulièrement doués pour *contrôler des choses*, d'où le nom. Ils ont un ensemble de « broches » (les petites pattes d'araignée sortant de la puce) qui sont appelées broches *GPIO* (General Purpose Input and Output - Entrées et Sorties à Usage Générique), ou broches E/S (Entrée / Sortie).Ils peuvent être branchés à des capteurs ou boutons pour observer le monde, ou bien être branchés à des lumières ou moteurs pour agir sur le monde. Ces broches du micro-contrôleur ont été directement connectés aux barettes de broches sur les côtés du Spark Core de manière à pouvoir aisément y accéder. Plus précisément, les broches libellées D0 à D7, et A0 à A7 sont directement branchées sur les broches GPIO du micro-contrôleur.

Le micro-contrôleur peut aussi communiquer avec d'autres puces à l'aide de protocoles courant comme *Série* (aussi appelé UART), *SPI* ou *I2C* (aussi appelé Wire). Vous pouvez rendre le Core encore plus puissant en le connectant à des puces spécialisées, telles des pilotes de moteurs ou des décaleurs de registre. Parfois, ces puces seront « emballées » sur un *Shield*, un accessoire au Core qui rends plus facile la possibilité d'étendre les capacités de ce dernier.

Le Core possède aussi un module Wi-Fi, qui le connecte à votre réseau Wi-Fi local de la même manière que votre ordinateur ou smartphone se connecte à un réseau Wi-Fi. Le Core est programmé par défaut pour rester connecté à Internet tant qu'il peut trouver et se connecter à un réseau.

Quand le Core de connecte à Internet, il crée une connexion au *Spark Cloud*. En se connectant au Cloud, le Core devient accessible de n'importe où à l'aide d'une simple API REST. Cette API est conçue pour faciliter l'interfaçage au Core via une appli web ou un appli mobile de manière sécurisée et privé. De cette façon, seuls vous et ceux à qui vous faites confiance peuvent accéder au Core.

### Boutons

Il y a deux boutons sur le Core : le bouton RESET (sur la droite) et le bouton MODE (sur la gauche).

Le bouton RESET va effectuer un redémarrage matériel du Core, en coupant et réactivant son alimentation. C'est une bonne manière pour redémarrer une application que vous avez téléchargé sur le Core.

Le bouton MODE a trois fonctions :

- Tenez le bouton MODE enfoncé pendant trois secondes pour mettre le Core en mode *Smart Config* afin de le connecter à votre réseau Wi-Fi local. La LED devrait commencer à clignoter en bleu.
- Tenez le bouton MODE enfoncé pendant dix secodes pour effacer de la mémoire du Core les informations sur les réseaux Wi-Fi
- Tenez le bouton MODE enfoncé, appuyez un coup sur le bouton RESET, et patientez *trois secondes* pour entrer dans le mode *Bootloader*, d'où vous pouvez reprogrammer le Core via USB ou JTAG. Relâchez le bouton MODE quand la LED commence à clignoter en jaune. Si vous le faites accidentellement, appuyez juste un coup sur le bouton RESET pour quitter le mode *Bootloader*
- Tenez le bouton MODE enfoncé, appuyez un coup sur le bouton RESET, et patientez *dix secondes* pour effectuer une *restauration des paramètres d'usine* où le Core est reprogrammé avec l'application qui y était installé à l'usine (l'application Tinker). La LED devrait clignoter en blanc pendant trois secondes puis se mettre à clignoter rapidement. Quand la LED clignote d'une autre couleur, le Core a été remis aux valeurs par défaut. C'est très utile quand vous avez un bug dans votre firmware ou bien que vous souhaitez réinstaller l'application Tinker.


### LEDs

Il y a deux LEDs sur le Core. La grosse présente au milieu est une LED RVB qui vous indique le statut de la connexion Internet du Core. L'autre petite LED bleue est la *LED utilisateur*. Elle est connectée à D7, donc quand vous basculez D7 à `HIGH` où `LOW`, elle s'allume ou s'éteint respectivement.

La LED RVB devrait présenter les états suivants : 

- *Clignotement bleu* : En écoute des informations réseau.
- *Bleu fixe* : Fin du Smart Config, les informations réseau ont été trouvées.
- *Clignotement vert* : Connexion au réseau Wi-Fi local
- *Clignotement cyan* : Connexion au Spark Cloud.
- *Pulsation cyan lente*: Connecté au Spark Cloud.
- *Clignotement jaune*: Mode bootloader mode, en attente du nouveau code via USB ou JTAG.
- *Clignotement blanc*: Lancement de la restauration des paramètres d'usine.
- *Blanc fixe*: Fin de la restauration des paramètres d'usine, redémarrage.

La LED RVB peut aussi vous faire savoir s'il y a eu des erreurs lors de l'établissement de la connexion à Internet. *Une LED rouge signifie qu'il y a eu une erreur.* Ces erreurs peuvent être :

- *Deux clignotements rouges* : Échec de la connexion suite à une mauvaise connexion à Internet. Vérifiez votre connexion réseau.
- *Trois clignotements rouges* : Le Cloud est inaccessible, mais la connexion Internet est bonne. Vérifiez notre [flux Twitter](http://www.twitter.com/sparkdevices) pour voir si nous avons signalé une interruption des services. Si ce n'est pas le cas, allez voir nos [pages de support](https://www.sparkdevices.com/support) pour obtenir de l'aide.
- *Quatre clignotements rouges* : le Cloud est joignable, mais la connexion sécurisée n'a pu se faire. Allez voir nos [pages de support](https://www.sparkdevices.com/support) pour obtenir de l'aide.
- *Clignotements jaunes / rouges* : Mauvais identifiants pour le Spark Cloud. Contactez l'équipe Spark (<a href="mailto@hello@spark.io">hello@spark.io</a>).

### Broches

Le Core possède 24 broches que vous pouvez connecter à un circuit. Ces broches sont :

- _VIN_ : Connectez à cette broche une alimentation non régulée d'une tension comprise entre 3,6V et 6V pour alimenter le Core. Si vous alimentez le Core via USB, cette broche *ne doit pas* être utilisée.
- _3V3_ : Cette broche fournie une tension régulée de 3,3V que vous pouvez utiliser pour alimenter d'autres composants en dehors du Core. (De même, si vous possédez votre propre alimentation régulée de 3,3V, vous pouvez la brancher ici pour alimenter le Core).
- _3V3*_ : Cette broche fournie une autre tension régulée de 3,3V, mais filtrée. Elle est destinée à alimenter des circuits sensibles au bruit provenant des composants électroniques. Si vous utilisez des capteurs analogiques sensibles, alimentez les via la broche _3V3*_ plutôt que la broche _3V3_.
- _!RST_ : Vous pouvez redémarrer le Core (de la même manière qu'en appuyant sur le bouton RESET) en connectant cette broche à GND.
- _GND_ : Ces broches sont les broches de mise à la masse.
- _D0 à D7_ : Ces broches sont les broches à tout faire du Spark Core : 8 broches GPIO (General Purpose Input/Output). Elles sont libellées « D » parce que ce sont des broches « numériques » (Digital), ce qui signifie qu'elles ne peuvent pas lire les valeurs des capteurs analogiques. Certaines de ces broches possèdent des périphériques additionnels (SPI, JTAG, etc.), plus d'infos plus loin.
- _A0 à A7_ : Ces broches sont 8 broches GPIO supplémentaires, pour un total de 16. Elles sont identiques à D0 à D7, si ce n'est qu'elles sont des broches « analogiques », ce qui signifie qu'elles peuvent lire les valeurs de capteurs analogiques (techniquement, elles possèdent un périphérique de convertion analogique vers numérique). Tout comme les broches numériques, certaines de ces broches possèdent des périphériques additionnels
- _TX et RX_ : Ces broches sont dédiées aux communications Série / UART. TX correspond à la broche émettrice et RX correspond à la broche réceptrique.

#### Broche PWM

Quand vous souhaitez utiliser la fonction `analogWrite()` du Core, par exemple pour diminuer l'intensité lumineuse de LED, vous devez utiliser les broches qui possèdent un timer. Les gens les appelent fréquemment des broches PWM, car ce qu'elles font est appelé Pulse Width Modulation (Modulation à Largeur d'Impulsion). Le Core possède 8 broches PWM : A0, A1, A4, A5, A6, A7, D0 et D1.

The Spark Cloud
---

The Spark Cloud is a network of servers hosted at `https://api.spark.io/` that the Spark Core connects to once it's on your Wi-Fi network.

The Cloud exists for three main reasons:

### Simplicity

Generally speaking, when you work in an embedded system, networking means sending bytes over TCP sockets and UDP datagrams. Everyone agrees - socket programming is not fun. But higher-level communications are difficult because microcontrollers have so little memory they can't generally host a traditional HTTP web server. The Cloud gives you the simplicity of the web server with the low cost and low power of a microcontroller by translating between web communications (HTTP requests) and embedded communications (in our case, encrypted CoAP messages).

But you don't have to know any of that. The whole point of the Cloud is that all of this is abstracted away. You don't need to know *how* it connects to the internet; it just does. And once it's connected, you can make it do awesome things quickly and easily, without dealing with sockets.

### Global availability

By default, if you connect a thing to your Wi-Fi network, it's only available from elsewhere on your local network. This is a result of the fact that we've run out of IP addresses, and it's also a security measure, since it means that people can't just reach into your home willy-nilly and mess with your stuff.

Making the stuff in your home available outside your home is a pain, and usually requires nasty things like port mapping and static IP addresses. Even if you're technically savvy enough to handle this stuff, if you're developing a product, you don't want to make familiarity with OpenWRT a pre-requisite for purchasing your product.

We avoid this issue entirely with the Cloud. The Core connects to the Cloud when it hits your Wi-Fi network, and holds open a persistent connection. This means that it's available from anywhere in the world at any time.

But wait, if local networks are a security measure, then doesn't this open you up to all sorts of nastiness? Well, it would, except...

### Security

Yep, that's right. We thought of that.

Security is hard. It's especially hard on an embedded system, because encryption is resource intensive. But it's also important, because you don't want anyone turning on and off your lights, or worse, locking and unlocking your front doors.

We hand-picked a set of rock-solid security protocols that are secure and efficient, so they work great on an embedded system. They're baked into the Spark Protocol, which is open source and ready to be extended to other products.



Tinkering with "Tinker"
======

The Tinker app
---

![Tinker](images/tinker.png)

The Tinker section of the Spark mobile app makes it very easy to start playing with your Spark Core without writing any code. It's great for early development, and often it will do everything you need to get your project off of the ground.

The app consists of 16 pins in vertical rows - 8 analog pins on the left, 8 digital pins on the right. These pins represent the 16 GPIO (General Purpose Input and Output) pins on the Spark Core, and are organized the same way.

![Tinker selection](images/tinker-select.png)

To begin, tap any of the pins. A menu will pop up showing the functions that pin has available. Each pin can have up to four possible functions:

- **digitalWrite**: Sets the pin to HIGH or LOW, which either connects it to 3.3V (the maximum voltage of the system) or to GND (ground). Pin D7 is connected to an on-board LED; if you set pin D7 to HIGH, the LED will turn on, and if you set it to LOW, it will turn off.
- **analogWrite**: Sets the pin to a value between 0 and 255, where 0 is the same as LOW and 255 is the same as HIGH. This is sort of like sending a voltage between 0 and 3.3V, but since this is a digital system, it uses a mechanism called Pulse Width Modulation, or PWM. You could use *analogWrite* to dim an LED, as an example.
- **digitalRead**: This will read the digital value of a pin, which can be read as either HIGH or LOW. If you were to connect the pin to 3.3V, it would read HIGH; if you connect it to GND, it would read LOW. Anywhere in between, it'll probably read whichever one it's closer to, but it gets dicey in the middle.
- **analogRead**: This will read the analog value of a pin, which is a value from 0 to 4095, where 0 is LOW (GND) and 4095 is HIGH (3.3V). All of the analog pins (A0 to A7) can handle this. *analogRead* is great for reading data from sensors.

To change the function of the pin, simply tap and hold on the pin, and the function select menu will come back up. Any further questions? Come talk to us in the [forums!](https://community.sparkdevices.com/)

The Tinker firmware
---

The Tinker firmware is the default application program stored in the Spark Core upon its commissioning from the factory assembly line. You can always get back to it by putting the Core in the [factory reset mode](#buttons), or by re-flashing your Core with Tinker in the Spark mobile app.

The Tinker app is a great example of how to build a very powerful application with not all that much code. You can have a look at the latest release [here.](https://github.com/spark/core-firmware/blob/master/src/application.cpp)

The Tinker API
---

When the Tinker firmware is installed on your Spark Core, it will respond to certain API requests from your mobile app, which mirror the four basic GPIO functions (digitalWrite, analogWrite, digitalRead, analogRead). These API requests can also be made from another application, so you can build your own web or mobile app around the Tinker firmware.

### digitalWrite

Sets the pin to HIGH or LOW, which either connects it to 3.3V (the maximum voltage of the system) or to GND (ground). Pin D7 is connected to an on-board LED; if you set pin D7 to HIGH, the LED will turn on, and if you set it to LOW, it will turn off.

    POST /v1/devices/{DEVICE_ID}/digitalwrite

    # EXAMPLE REQUEST IN TERMINAL
    # Core ID is 0123456789abcdef01234567
    # Your access token is 1234123412341234123412341234123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef01234567/digitalwrite \
      -d access_token=1234123412341234123412341234123412341234 -d params=D0,HIGH

The parameters must be the pin (A0 to A7, D0 to D7), followed by either HIGH or LOW, separated by a comma. The return value will be 1 if the write succeeds, and -1 if it fails.



### analogWrite

Sets the pin to a value between 0 and 255, where 0 is the same as LOW and 255 is the same as HIGH. This is sort of like sending a voltage between 0 and 3.3V, but since this is a digital system, it uses a mechanism called Pulse Width Modulation, or PWM. You could use *analogWrite* to dim an LED, as an example.

    POST /v1/devices/{DEVICE_ID}/analogwrite

    # EXAMPLE REQUEST IN TERMINAL
    # Core ID is 0123456789abcdef01234567
    # Your access token is 1234123412341234123412341234123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef01234567/analogwrite \
      -d access_token=1234123412341234123412341234123412341234 -d params=A0,215

The parameters must be the pin (A0 to A7, D0 to D7), followed by an integer value from 0 to 255, separated by a comma. The return value will be 1 if the write succeeds, and -1 if it fails.

    


### digitalRead

This will read the digital value of a pin, which can be read as either HIGH or LOW. If you were to connect the pin to 3.3V, it would read HIGH; if you connect it to GND, it would read LOW. Anywhere in between, it'll probably read whichever one it's closer to, but it gets dicey in the middle.

    POST /v1/devices/{DEVICE_ID}/digitalread

    # EXAMPLE REQUEST IN TERMINAL
    # Core ID is 0123456789abcdef01234567
    # Your access token is 1234123412341234123412341234123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef01234567/digitalread \
      -d access_token=1234123412341234123412341234123412341234 -d params=D0


The parameter must be the pin (A0 to A7, D0 to D7). The return value will be 1 if the pin is HIGH, 0 if the pin is LOW, and -1 if the read fails.



### analogRead

This will read the analog value of a pin, which is a value from 0 to 4095, where 0 is LOW (GND) and 4095 is HIGH (3.3V). All of the analog pins (A0 to A7) can handle this. *analogRead* is great for reading data from sensors.

    POST /v1/devices/{DEVICE_ID}/analogread

    # EXAMPLE REQUEST IN TERMINAL
    # Core ID is 0123456789abcdef01234567
    # Your access token is 1234123412341234123412341234123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef01234567/analogread \
      -d access_token=1234123412341234123412341234123412341234 -d params=A0

The parameters must be the pin (A0 to A7, D0 to D7). The return value will be between 0 and 4095 if the read succeeds, and -1 if it fails.


Flash Apps with Spark Build
===

What is firmware?
---

An *embedded system* like the Spark Core doesn't have an Operating System like a traditional computer. Instead, it runs a single application, often called *firmware*, which runs whenever the system is powered.

*Firmware* is so-called because it's harder than software and softer than hardware. Hardware is fixed during manufacturing, and doesn't change. Software can be updated anytime, so it's very flexible. Firmware is somewhere in between; hardware companies do issue firmware updates, but they tend to be very infrequent, because upgrading firmware can be difficult.

In our case, because the Spark Core is connected to the internet, updating firmware is quite trivial; we send it over the network, and we have put in place safeguards to keep you from "bricking" the Core.

When you flash code onto the Spark Core, you are doing an *over-the-air firmware update*. This firmware update overwrites almost all of the software on the Spark Core; the only piece that is untouched is the bootloader, which manages the process of loading new firmware and ensures you can always update the firmware over USB or through a factory reset.  (We'll be open sourcing the bootloader as soon as we can bring the README up to date.)

Logging into Spark Build
---
When you're ready to reprogram your Spark Core, head over to our IDE:

[Spark Build >](https://www.spark.io/build)

![Spark Build](images/create-account.jpg)

Creating an account is a simple one-step process.  When presented with the login screen, simply enter your email address (careful!), and desired account password.  Press the big friendly "Sign Up" button, and you'll reach the Spark Build home page.

![Spark Build](images/log-in.jpg)

If you've already logged into Spark Build before, click the "Let me log in" text beneath the Sign Up button, and you'll be presented with a login for existing users.  Don't worry--if you already have an account and accidentally click the "Sign Up" button, we'll still log you into your existing account.

Spark Build, our web IDE
---

![Spark Build](images/ide.png)

Spark Build is an Integrated Development Environment, or IDE; that means that you can do software development in an easy-to-use application, which just so happens to run in your web browser.

Spark Build starts with the navigation bar on the left. On the top, there are three buttons, which serve important functions:

- **Flash**: Flashes the current code to the Spark Core. This initiates an *over-the-air firmware update* and loads the new software onto your Spark Core.
- **Verify**: This compiles your code without actually flashing it to the Core; if there are any errors in your code, they will be shown in the debug console on the bottom of the screen.
- **Save**: Saves any changes you've made to your code.

At the bottom, there are four more buttons to navigate through the IDE:

- **Code**: Shows a list of your firmware applications and lets you select which one to edit/flash.
- **Docs**: Brings you to the documentation for Spark.
- **Cores**: Shows a list of your Spark Cores, so you can choose which to flash, and get more information on each Core.
- **Settings**: Change your password, log out, or get your access token for API calls.

Spark Apps and Libraries
---

![Spark Build](images/spark-apps.jpg)

The heart of Spark Build is the "Spark Apps" section, which displays the name of the current app in your editor, as well as a list of your other applications and community-supported example apps.

The application you've got open in the editor is displayed under the "Current App" header.  You'll notice that this "HELLOWORLD" sample application has only one file, but firmware with associated libraries/multiple files are fully supported.  

From this pane, you've got a lot of buttons and actions available to you that can help you grow and manage your library of kick-ass applications:

- **Create**: You can create a new application by clicking the "Create New App" button.  Give it a sweet name and press enter!  Your app is now saved to your account and ready for editing.

- **Delete**: Click the "Remove App" button to remove it forever from your Spark library.

- **Rename**: You can rename your Spark App by simply double-clicking on the title of your app under the "Current App" header.  You can modify the "Optional description" field in the same way.
- **My Apps**: Tired of working on your current project?  Select the name of another app under the "My apps" header to open it in a tab of the Spark Build editor.

- **Files**: This header lists all known files associated with the open application.  Click on a supporting file in your application to open it as an active tab in the editor.

- **Examples**: The "Example apps" header lists a continuously growing number of community-supported example apps.  Use these apps as references for developing your own, or fork them outright to extend their functionality.


Flashing Your First App
---

The best way to get started with the IDE is to start writing code:

- **Connect**: Make sure your Core is powered and "breathing" Cyan, which indicates that it's connected to the Spark Cloud and ready to be updated.

---
- **Get Code**: Try clicking on the "Blink an LED" example under the "Example apps" header.  The Spark Build editor should display the code for the example application in an active tab.  Alternatively, you can copy and paste this snippet of code into a new application in the Build IDE.

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

![Spark Build](images/select-a-core.jpg)

- **Select Your Core**: The next step is to make sure that you've selected which of your Cores to flash code to.  Click on the "Cores" icon at the bottom left side of the navigation pane, and click on the star next to the Core you'd like to update.  Once you've selected a Core, the star associated with it will turn yellow.

- **Flash**: Click the "Flash" button, and your code will be sent wirelessly to your Core.  If the flash was successful, the LED on your Core will begin flashing magenta.

![Spark Build](images/fork-app.jpg)

- **Fork**: Wish the timing of that LED flash was a little bit faster?  Try clicking on the "Fork This Example" button after selecting the "Blink An LED" example application.  You've now got a personal copy of that application that you can modify, save, and flash to all of your Cores.

- **Edit**: Try changing the values in the delay() function from 1000 to 250, which changes the timing interval from 1000 milliseconds to only 250 milliseconds.  Click the Verify button, then the Flash button.  Is your Core's LED blinking faster?  Well done :)


Account Information
---

There are a couple of other neat bells and whistles in Spark Build.  The Spark Build IDE the best tool for viewing important information about your Core, managing Cores associated with your Spark account, and "unclaiming" them so they can be transferred to your buddy.

![Spark Build](images/device-id.jpg)

- **Core ID**: You can view your Core's Device ID by clicking on the "Cores" icon at the bottom of the navigation pane, then clicking the dropdown arrow next to the Core of interest.  

- **Unclaim**: You can "Unclaim" a Core by pressing the "Remove Core" button that is revealed by clicking the dropdown arrow.  Once a Core has been unclaimed, it is available to be reassociated with any Spark users' account.

![Spark Build](images/access-token.png)

- **API Key**: You can find your most recent API Key listed under the "Settings" tab in your account.  You can press the "Reset Token" button to assign a new API Key to your account.  *Note* that pressing this button will require you to update any hard-coded API Credentials in your Spark-powered projects!






The Spark Command Line
===

**Coming soon!** Command line tools so that you can build Spark applications with your own desktop IDE, whether it's Eclipse, Sublime Text, Vim, or anything else.

Deploying a Spark web app
===

**Coming soon!** We'll give you instructions for how to deploy a web app on Heroku that can talk with a Spark Core.

Troubleshooting
===

What's wrong?
---

### My Core won't connect to Wi-Fi

There are many reasons that your Core might not be connecting to your Wi-Fi network. To debug, check out our detailed connection troubleshooting section:

[Why won't it connect? >](/#/connect/troubleshooting)

### I can't talk to my Core

Once your Core is connected, it needs to be *claimed* in order to be associated with your account. This is what lets you control your Core and keeps anyone else from doing so.

If you use the mobile app to set up your Core, it should claim it automatically. However if you connect your Core over USB, or if the claiming process is unsuccessful, you can claim it manually.

Head over to our connection page to learn about this:

[ Claiming your Core >](/#/connect/claiming-your-core)

### My Core won't start up

If your Core won't start up (the LED never comes on), here are a few things to check:

- Is the Core receiving sufficient power? If you're not sure, connect a multimeter to the 3.3V pin and GND and see if you get 3.3V, as expected. Try connecting the Core to another power source.
- Have any components been damaged? Visually inspect both sides of the Core.

### My Core is behaving erratically

If you're seeing unexpected behavior with your Core, here are a few things to check:

- Is the Core receiving sufficient power? The Core might behave eratically if it's plugged into an unpowered USB hub and not receiving enough power. In addition, if you have components that draw a lot of power (motors, for instance), you might need more power than your computer can supply. Try using a USB power supply or providing more power directly to the VIN or 3.3V pins.
- If you have a u.FL Core, is an antenna connected? Are you within range of the Wi-Fi router?


Further resources
===

Hardware development
---

### Hardware for dummies

**Coming soon!**

### Advanced hardware

**Coming soon!**

Software development
---

### Software for dummies

**Coming soon!**

### Advanced software

**Coming soon!**
