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

Alimenter le Core est facile. Il reçoit du courant à travers un port micro USB, de manière similaire à beaucoup de smartphones et autres gadgets. Alimentez votre Core en connectant le câble micro USB au connecteur USB du Core, et l'autre extrémité dans un connecteur USB de votre ordinateur, d'un hub USB (de préférence avec une alimentation externe), ou d'une alimentation USB (comme celle qui vient surement avec votre smartphone).

Si vous le souhaitez, vous pouvez aussi alimenter le Core en appliquant une tension de 3,6V à 6V sur la broche `VIN`, ou 3,3V sur la broche `3.3V`.

Si vous possédez un Core avec un [connecteur u.FL](#/hardware/spark-core-datasheet-types-of-cores) pour une antenne externe, c'est le bon moment pour la brancher.

### Étape 2 : Télécharger l'application Spark pour iOS ou Android

![L'application Spark](../images/spark-apps.png)

L'application mobile Spark est la méthode la plus facile pour connecter votre Spark Core à Internet. L'application vous aidera à effectuer trois choses :

- Créer un compte Spark
- Connecter votre Spark Core à votre réseau Wi-Fi
- Contrôler votre Core sans écrire une seule ligne de code

L'application iOS nécessite iOS 7, et l'application Android fonctionne à partir de Ice Cream Sandwich (Android 4.0).

[Télécharger l'application iPhone >](https://itunes.apple.com/fr/app/spark-core/id760157884)

[Télécharger l'application Android >](https://play.google.com/store/apps/details?id=io.spark.core.android)



### Étape 3 : Connecter le Core au Wi-Fi

![Smart Config](../images/smart-config.png)

Connecter le Spark Core au Wi-Fi est simple comme tout. En fait, je l'ai fait deux fois tout en rédigeant ce paragraphe.

L'application mobile Spark vous guidera pendant le processus, mais c'est tout simplement un processus en une étape où vous saisirez le nom de votre réseau Wi-Fi (SSID) et son mot de passe, et ces derniers seront envoyés via le Wi-Fi à votre Spark Core, qui se connectera automatiquement au réseau et au Spark Cloud. Si tout fonctionne comme prévu, vous verrez la LED passer par les couleurs suivantes :

- **Clignotements bleus** : En attente des informations Wi-Fi
- **Clignotements verts** : Connexion au réseau Wi-Fi
- **Clignotements cyans** : Connexion au Spark Cloud
- **Clignotements magenta** : Mise à jour du dernier firmware
- **Pulsations cyans**: Connecté !

<div id="core1" class="core"><div class="core-butt"></div><div class="rgb"><div class="pattern"></div></div></div>

<a id="button1" class="button" onclick="animateCore()">Voir l'animation</a>

Si l'application mobile ne fonctionne pas dans votre cas, vous pouvez aussi connecter votre Spark Core via USB. Pour plus d'informations, ou pour une explication plus complète sur comment connecter votre Core à Internet, référez-vous à :

[Connecter votre Core >](/#/connect)

### Étape 4 : Faire clignoter une LED avec Tinker

![Tinker](../images/tinker.png)

L'application mobile Spark contient une mini-application nommée Tinker qui vous permet… et bien, de bidouiller (to tinker en anglais = bricoler, tripatouiller, bidouiller). Elle vous permet de communiquer avec les entrées / sorties du Spark Core sans écrire une seule ligne de code.

Chacune des broches possède jusqu'à fonctions : *digitalWrite*, *analogWrite*, *digitalRead*, et *analogRead*. Pour plus d'informations, descendez jusqu'à la section « Bidouiller avec Tinker ».

### Étape 5 : Écrire des applications avec Spark Build

![Spark Build](../images/ide.png)

Une fois que vous serez fatigués de lire des valeurs de capteurs et de faire clignoter des LEDs, dirigez vous vers l'IDE (environnement de développement) Spark Build pour le vrai spectacle. Spark Build vous permet de créer et flasher des applications personnelles sur votre Core depuis n'importe quel navigateur récent, et équiper votre Core avec toutes les possibilités d'Internet ! Impressionnant !

Ne soyez pas nerveux. Nous vous avons préparé plein d'exemples validés par la communauté et de bibliothèques de fonctions qui vont permettrons de partir du bon pied. Pour en savoir plus, jetez un œil à la section « Écrire des application avec Spark Build » plus bas dans la page.

Doucement, c'est quoi ce truc ?
=====

Le Spark Core est un kit de développement Wi-Fi pour du matériel connecté à Internet. Il est, par essence, le « cerveau » d'un produit ou projet de matériel connecté à Internet.

Le Core possède un micro-contrôleur, qui est un ordinateur petit, bon marché et peu puissant (en performances et consommation d'énergie) capable de faire tourner une application unique. Le micro-contrôleur est le directeur du spectacle : il fait tourner le logiciel et indique au reste du Core ce qu'il a à faire. Il ne possède pas de système d'exploitation tel que celui que fait tourner votre ordinateur; il fait simplement tourner une application unique (souvent appelée *firmware* ou *application embarquée*), qui peu être toute simple (quelques lignes de code) ou extrêmement complexe, selon ce que vous voulez faire.

Les micro-contrôleurs sont particulièrement doués pour *contrôler des choses*, d'où le nom. Ils ont un ensemble de « broches » (les petites pattes d'araignée sortant de la puce) qui sont appelées broches *GPIO* (General Purpose Input and Output - Entrées et Sorties à Usage Générique), ou broches E/S (Entrée / Sortie). Ils peuvent être branchés à des capteurs ou boutons pour observer le monde, ou bien être branchés à des lumières ou moteurs pour agir sur le monde. Ces broches du micro-contrôleur ont été directement connectés aux barrettes de broches sur les côtés du Spark Core de manière à pouvoir aisément y accéder. Plus précisément, les broches libellées D0 à D7, et A0 à A7 sont directement branchées sur les broches GPIO du micro-contrôleur.

Le micro-contrôleur peut aussi communiquer avec d'autres puces à l'aide de protocoles courants comme *Série* (aussi appelé UART), *SPI* ou *I2C* (aussi appelé Wire). Vous pouvez rendre le Core encore plus puissant en le connectant à des puces spécialisées, telles des pilotes de moteurs ou des registres à décalage. Parfois, ces puces seront « emballées » sur un *Shield*, un accessoire au Core qui rend plus facile la possibilité d'étendre les capacités de ce dernier.

Le Core possède aussi un module Wi-Fi, qui le connecte à votre réseau Wi-Fi local de la même manière que votre ordinateur ou smartphone se connecte à un réseau Wi-Fi. Le Core est programmé par défaut pour rester connecté à Internet tant qu'il peut trouver et se connecter à un réseau.

Quand le Core de connecte à Internet, il crée une connexion au *Spark Cloud*. En se connectant au Cloud, le Core devient accessible de n'importe où à l'aide d'une simple API REST. Cette API est conçue pour faciliter l'interfaçage au Core via une application web ou un application mobile de manière sécurisée et privée. De cette façon, seuls vous et ceux à qui vous faites confiance peuvent accéder au Core.

### Boutons

Il y a deux boutons sur le Core : le bouton `{{reset-button}}` (sur la droite) et le bouton `{{system-button}}` (sur la gauche).

Le bouton `{{reset-button}}` va effectuer un redémarrage matériel du Core, en coupant et réactivant son alimentation. C'est une bonne manière pour redémarrer une application que vous avez téléchargé sur le Core.

Le bouton `{{system-button}}` a trois fonctions :

- Tenez le bouton `{{system-button}}` enfoncé pendant trois secondes pour mettre le Core en mode *Smart Config* afin de le connecter à votre réseau Wi-Fi local. La LED devrait commencer à clignoter en bleu.
- Tenez le bouton `{{system-button}}` enfoncé pendant dix secondes pour effacer de la mémoire du Core les informations sur les réseaux Wi-Fi
- Tenez le bouton `{{system-button}}` enfoncé, appuyez un coup sur le bouton `{{reset-button}}`, et patientez *trois secondes* pour entrer dans le mode *Bootloader*, d'où vous pouvez reprogrammer le Core via USB ou JTAG. Relâchez le bouton `{{system-button}}` quand la LED commence à clignoter en jaune. Si vous le faites accidentellement, appuyez juste un coup sur le bouton `{{reset-button}}` pour quitter le mode *Bootloader*
- Tenez le bouton `{{system-button}}` enfoncé, appuyez un coup sur le bouton `{{reset-button}}`, et patientez *dix secondes* pour effectuer une *restauration des paramètres d'usine* où le Core est reprogrammé avec l'application qui y était installée à l'usine (l'application Tinker). La LED devrait clignoter en blanc pendant trois secondes puis se mettre à clignoter rapidement. Quand la LED clignote d'une autre couleur, le Core a été remis aux valeurs par défaut. C'est très utile quand vous avez un bug dans votre firmware ou bien que vous souhaitez réinstaller l'application Tinker.


### LEDs

Il y a deux LEDs sur le Core. La grosse présente au milieu est une LED RVB qui vous indique le statut de la connexion Internet du Core. L'autre petite LED bleue est la *LED utilisateur*. Elle est connectée à D7, donc quand vous basculez D7 à `HIGH` où `LOW`, elle s'allume ou s'éteint respectivement.

La LED RVB devrait présenter les états suivants : 

- *Clignotement bleu* : En écoute des informations réseau.
- *Bleu fixe* : Fin du Smart Config, les informations réseau ont été trouvées.
- *Clignotement vert* : Connexion au réseau Wi-Fi local
- *Clignotement cyan* : Connexion au Spark Cloud.
- *Pulsation cyan lente* : Connecté au Spark Cloud.
- *Clignotement jaune* : Mode bootloader, en attente du nouveau code via USB ou JTAG.
- *Clignotement blanc* : Lancement de la restauration des paramètres d'usine.
- *Blanc fixe* : Fin de la restauration des paramètres d'usine, redémarrage.
- *Clignotement magenta* : Mise à jour du firmware.
- *Magenta fixe* : Possible perte de la connexion au Spark Cloud. Un appui sur le bouton reset (RST) lancera à nouveau la mise à jour.


La LED RVB peut aussi vous faire savoir s'il y a eu des erreurs lors de l'établissement de la connexion à Internet. *Une LED rouge signifie qu'il y a eu une erreur.* Ces erreurs peuvent être :

- *Deux clignotements rouges* : Échec de la connexion suite à une mauvaise connexion à Internet. Vérifiez votre connexion réseau.
- *Trois clignotements rouges* : Le Cloud est inaccessible, mais la connexion Internet est bonne. Vérifiez notre [flux Twitter](http://www.twitter.com/sparkdevices) pour voir si nous avons signalé une interruption des services. Si ce n'est pas le cas, allez voir nos [pages de support](https://www.sparkdevices.com/support) pour obtenir de l'aide.
- *Quatre clignotements rouges* : le Cloud est joignable, mais la connexion sécurisée n'a pu se faire. Allez voir nos [pages de support](https://www.sparkdevices.com/support) pour obtenir de l'aide.
- *Clignotements jaunes / rouges* : Mauvais identifiants pour le Spark Cloud. Contactez l'équipe Spark (<a href="mailto@hello@particle.io">hello@particle.io</a>).

### Broches

Le Core possède 24 broches que vous pouvez connecter à un circuit. Ces broches sont :

- _VIN_ : Connectez à cette broche une alimentation non régulée d'une tension comprise entre 3,6V et 6V pour alimenter le Core. Si vous alimentez le Core via USB, cette broche *ne doit pas* être utilisée.
- _3V3_ : Cette broche fournie une tension régulée de 3,3V que vous pouvez utiliser pour alimenter d'autres composants en dehors du Core. (De même, si vous possédez votre propre alimentation régulée de 3,3V, vous pouvez la brancher ici pour alimenter le Core).
- _3V3*_ : Cette broche fournie une autre tension régulée de 3,3V, mais filtrée. Elle est destinée à alimenter des circuits sensibles au bruit provenant des composants électroniques. Si vous utilisez des capteurs analogiques sensibles, alimentez les via la broche _3V3*_ plutôt que la broche _3V3_.
- _!RST_ : Vous pouvez redémarrer le Core (de la même manière qu'en appuyant sur le bouton `{{reset-button}}`) en connectant cette broche à GND.
- _GND_ : Ces broches sont les broches de mise à la masse.
- _D0 à D7_ : Ces broches sont les broches à tout faire du Spark Core : 8 broches GPIO (General Purpose Input/Output). Elles sont libellées « D » parce que ce sont des broches « numériques » (Digital), ce qui signifie qu'elles ne peuvent pas lire les valeurs des capteurs analogiques. Certaines de ces broches possèdent des périphériques additionnels (SPI, JTAG, etc.), plus d'infos plus loin.
- _A0 à A7_ : Ces broches sont 8 broches GPIO supplémentaires, pour un total de 16. Elles sont identiques à D0 à D7, si ce n'est qu'elles sont des broches « analogiques », ce qui signifie qu'elles peuvent lire les valeurs de capteurs analogiques (techniquement, elles possèdent un périphérique de conversion analogique vers numérique). Tout comme les broches numériques, certaines de ces broches possèdent des périphériques additionnels
- _TX et RX_ : Ces broches sont dédiées aux communications Série / UART. TX correspond à la broche émettrice et RX correspond à la broche réceptrice.

#### Broche PWM

Quand vous souhaitez utiliser la fonction `analogWrite()` du Core, par exemple pour diminuer l'intensité lumineuse de LED, vous devez utiliser les broches qui possèdent un timer. Les gens les appellent fréquemment des broches PWM, car ce qu'elles font est appelé Pulse Width Modulation (Modulation par Largeur d'Impulsion). Le Core possède 8 broches PWM : A0, A1, A4, A5, A6, A7, D0 et D1.

Le Particle Cloud
---

Le Particle Cloud est le réseau de serveurs hébergés à l'adresse `https://api.particle.io/` auquel se connecte le Spark Core une fois qu'il est connecté au réseau Wi-Fi.

Le Cloud existe pour trois raisons principales :

### Simplicité

Généralement, quand vous travaillez sur un système embarqué, le réseau signifie envoyer des octets à travers des sockets TCP et des datagrammes UDP. Tout le monde avoue que la programmation de socket n'est pas amusante. Mais les communications de haut niveau sont difficiles parce que les micro-contrôleurs ont si peu de mémoire qu'ils ne peuvent héberger un serveur web HTTP traditionnel. Le Cloud vous fourni la simplicité d'un serveur web avec le faible coût et la faible consommation d'un micro-contrôleur en faisant le lien entre les communications web (requêtes HTTP) et les communications embarquées (dans notre cas, des messages CoAP chiffrés).

Mais vous n'avez pas besoin de savoir tout ça. Le fait est que tout ceci est masqué au premier abord. Vous n'avez pas besoin de savoir *comment* ça se connecte à Internet, ça se contente de le faire. Et une fois que c'est connecté, vous pouvez faire facilement faire des choses fantastiques sans avoir à gérer les sockets.

### Disponibilité générale

Par défaut, si vous connectez quelque chose à votre réseau Wi-Fi, c'est seulement disponible depuis le réseau local. C'est le résultat du fait que nous arrivons à court d'adresses IP disponibles, et c'est aussi une mesure de sécurité, car les gens ne peuvent pas simplement accéder à l'intérieur de votre maison et jouer avec vos trucs.

Rendre les trucs dans votre maison accessible à l'extérieur est quelque chose de compliqué, et nécessite des choses horribles comme des redirections de port et des adresses IP fixes. Même si vous êtes suffisamment doués pour savoir gérer ce côté technique, si vous développez un produit vous ne voudriez pas qu'être expert avec OpenWRT soit un pré-requis pour l'achat de ce produit.

Nous évitons complètement ce problème avec le Cloud. Le Core se connecte au Cloud après sa connexion au réseau Wi-Fi, et maintient ouverte une connexion permanente. Ceci signifie qu'il est accessible n'importe où et n'importe quand dans le monde.

Mais attendez, si les réseau locaux sont une mesure de sécurité, est-ce que ça ne vous expose pas à plein de vilaines choses ? Et bien, ça devrait, mais…

### Sécurité

Oui, vous avez raison, nous y avons pensé.

La sécurité, c'est difficile. Et c'est particulièrement difficile sur un système embarqué parce que le chiffrage est fortement consommateur de ressources. Mais c'est aussi important parce que vous ne voudriez pas que n'importe qui puisse éteindre ou allumer vos lumières, ou pire, verrouiller ou déverrouiller votre porte d'entrée.

Nous avons choisi un ensemble de protocoles de sécurité éprouvés, qui sont à la fois sécurisés et efficaces et qui fonctionnent très bien sur un système embarqué. Ils ont été incorporés au Spark Protocol, qui est open source et prêt à être ajouté à d'autres produits.



Bidouiller avec « Tinker »
======

L'application Tinker
---

![Tinker](../images/tinker.png)

La section Tinker de l'application mobile Spark rend plus facile la volonté de jouer avec votre Spark Core sans écrire de code. Elle est extraordinaire pour les développements préliminaires, et fournira fréquemment tout ce dont vous avez besoin pour démarrer votre projet.

L'application consiste en 16 broches dans des colonnes verticales - 8 broches analogiques à gauche, 8 broches numériques à droite. Ces broches représentent les 16 broches GPIO du Spark Core, et sont organisées de la même manière.

![Sélection Tinker](../images/tinker-select.png)

Pour commencer, sélectionnez n'importe quelle broche. Un menu apparaitra pour vous proposer les fonctions disponibles pour cette broche. Chaque broche peut avoir jusqu'à quatre fonctions :

- **digitalWrite** : Place la broche à HIGH ou LOW, ce qui la connecte à 3,3V (la tension maximale du système) ou à GND (ground, la masse). La broche D7 est connectée à une LED embarquée. Si vous placez D7 à HIGH, la LED s'allumera, et si vous la placez à LOW, la LED s'éteindra.
- **analogWrite** : Place la broche à une valeur comprise entre 0 et 255, où 0 est équivalent à LOW et 255 à HIGH. C'est une manière de faire comme si nous envoyions une tension comprise entre 0 et 3,3 volts, mais comme il s'agit d'un système numérique, ça utilise un mécanisme nommé Modulation par Largeur d'Impulsion, ou PWM (Pulse Width Modulation). Vous pouvez par exemple utiliser *analogWrite* pour diminuer l'intensité lumineuse d'une LED.
- **digitalRead** : Lit la valeur numérique d'une broche, qui peut être soit HIGH, soit LOW. Si vous aviez connecté la broche à 3,3V, le résultat serait HIGH, si vous l'aviez connecté à GND, ce serait LOW. Quelque part entre les deux, ça retournerai le résultat le plus proche, mais ça reste aléatoire vers le milieu.
- **analogRead** : Lit la valeur numérique d'une broche, qui est une valeur comprise entre 0 et 4095, où 0 est LOW (GND) et 4095 est HIGH (3,3V). Toutes les broches analogiques (A0 à A7) le supportent. *analogRead* est adapté à la lecture de données provenant de capteurs.

Pour changer la fonction d'une broche, laissez le doigt sur la broche, et le menu de sélection de fonction sera de nouveau disponible. Vous avez d'autres questions ? Venez nous en parler sur les [forums!](https://community.sparkdevices.com/)

Le firmware Tinker
---

Le firmware Tinker est l'application stockée par défaut quand le Spark Core quitte les lignes d'assemblages à l'usine. Vous pouvez le retrouver en mettant le Core en mode [restauration des réglages d'usine](#boutons), ou bien en reflashant votre Core avec Tinker depuis l'application mobile Particle.

L'application Tinker est un bon exemple de comment construire une application puissante avec peu de code. Vous pouvez jeter un œil sur la dernière version disponible [ici.](https://github.com/particle-iot/core-firmware/blob/master/src/application.cpp)

L'API Tinker
---

Quand le firmware Tinker est installé sur votre Spark Core, il répondra à certaines requêtes depuis votre application mobile, qui reflète les quatre fonctions GPIO basiques (digitalWrite, analogWrite, digitalRead et analogRead). Ces requêtes peuvent aussi être effectuées depuis une autre application, ce qui fait que vous pouvez construire votre propre application web ou mobile autour du firmware Tinker.

### digitalWrite

Place la broche à HIGH ou LOW, ce qui la connecte à 3,3V (la tension maximale du système) ou à GND (ground, la masse). La broche D7 est connectée à une LED embarquée. Si vous placez D7 à HIGH, la LED s'allumera, et si vous la placez à LOW, la LED s'éteindra.

    POST /v1/devices/{DEVICE_ID}/digitalwrite

    # EXEMPLE DE REQUETE DANS LE TERMINAL
    # Core ID : 0123456789abcdef01234567
    # Access token : 1234123412341234123412341234123412341234
    curl https://api.particle.io/v1/devices/0123456789abcdef01234567/digitalwrite \
      -d access_token=1234123412341234123412341234123412341234 -d params=D0,HIGH

Les paramètres doivent être une broche (A0 à A7, D0 à D7), suivi par HIGH ou LOW, séparés par une virgule. La valeur de retour est 1 si l'écriture a réussi, -1 sinon.



### analogWrite

Place la broche à une valeur comprise entre 0 et 255, où 0 est équivalent à LOW et 255 à HIGH. C'est une manière de faire comme si nous envoyions une tension comprise entre 0 et 3,3 volts, mais comme il s'agit d'un système numérique, ça utilise un mécanisme nommé Modulation par Largeur d'Impulsion, ou PWM (Pulse Width Modulation). Vous pouvez par exemple utiliser *analogWrite* pour diminuer l'intensité lumineuse d'une LED.

    POST /v1/devices/{DEVICE_ID}/analogwrite

    # EXEMPLE DE REQUETE DANS LE TERMINAL
    # Core ID : 0123456789abcdef01234567
    # Access token : 1234123412341234123412341234123412341234
    curl https://api.particle.io/v1/devices/0123456789abcdef01234567/analogwrite \
      -d access_token=1234123412341234123412341234123412341234 -d params=A0,215

Les paramètres doivent être une broche (A0 à A7, D0 à D7), suivi par une valeur comprise entre 0 et 255, séparées par une virgule. La valeur de retour est 1 si l'écriture a réussi, -1 sinon.

    


### digitalRead

Lit la valeur numérique d'une broche, qui peut être soit HIGH, soit LOW. Si vous aviez connecté la broche à 3,3V, le résultat serait HIGH, si vous l'aviez connecté à GND, ce serait LOW. Quelque part entre les deux, ça retournerai le résultat le plus proche, mais ça reste aléatoire vers le milieu.

    POST /v1/devices/{DEVICE_ID}/digitalread

    # EXEMPLE DE REQUETE DANS LE TERMINAL
    # Core ID : 0123456789abcdef01234567
    # Access token : 1234123412341234123412341234123412341234
    curl https://api.particle.io/v1/devices/0123456789abcdef01234567/digitalread \
      -d access_token=1234123412341234123412341234123412341234 -d params=D0


Le paramètre doit être une broche (A0 à A7, D0 à D7). La valeur de retour est 1 si la broche est à HIGH, 0 si la broche est à LOW, -1 en cas d'échec de lecture.



### analogRead

Lit la valeur numérique d'une broche, qui est une valeur comprise entre 0 et 4095, où 0 est LOW (GND) et 4095 est HIGH (3,3V). Toutes les broches analogiques (A0 à A7) le supportent. *analogRead* est adapté à la lecteur de données provenant de capteurs.

    POST /v1/devices/{DEVICE_ID}/analogread

    # EXEMPLE DE REQUETE DANS LE TERMINAL
    # Core ID : 0123456789abcdef01234567
    # Access token : 1234123412341234123412341234123412341234
    curl https://api.particle.io/v1/devices/0123456789abcdef01234567/analogread \
      -d access_token=1234123412341234123412341234123412341234 -d params=A0

Le paramètre doit être une broche (A0 à A7, D0 à D7). La valeur de retour est comprise entre 0 et 4095 si la lecture réussi, -1 sinon.


Flasher des applications à l'aide du Spark Build
===

Qu'est-ce qu'un firmware
---

Un *système embarqué* comme le Spark Core ne possède pas de système d'exploitation tel un ordinateur. À la place, il fait tourner une unique application, souvent nommée *firmware* (micro-logiciel), qui fonctionne dès que le système est alimenté.

Le nom *firmware* vient du fait qu'il est plus dur que le logiciel, et plus mou que le matériel (logiciel : software, soft signifiant mou; matériel : hardware, hard signifiant dur; firmware : micro-logiciel; firm signifiant ferme). Le matériel est figé pendant sa fabrication et ne change pas. Le logiciel peut-être mis à jour n'importe quand, ce qui le rend très flexible. Le firmware est quelque part entre les deux. Les sociétés de matériel fournissent des mise à jour de firmware, mais le font peu souvent parce que mettre à jour un firmware peut être compliqué.

Dans notre cas, parce-que le Spark Core est connecté à Internet, la mise à jour du firmware est quasiment triviale. Nous la transférons par le réseau, et avons mis en place des sécurités pour vous empêcher de transformer le Core en un inutile presse-papier.

Quand vous flashez du code dans le Spark Core, vous faites une *mise à jour du firmware par les airs*. La mise à jour du firmware écrase quasiment tout le logiciel du Spark Core. Le seul morceau qui n'est pas modifié est ce qu'on appelle le bootloader, qui gère le processus de chargement du nouveau firmware et s'assure que vous pouvez toujours mettre à jour le firmware via USB ou une restauration des paramètres d'usine.

Connexion au Particle Build
---
Quand vous êtes prêt à reprogrammer votre Spark Core, dirigez vous vers notre IDE (environnement de développement).

[Particle Build >](https://www.particle.io/build)

![Spark Build](/assets/images/create-account.jpg)

Créer un compte est un simple processus en une étape. Quand vous êtes face à l'écran de connexion, saisissez simplement votre adresse mail (vérifiez de ne pas faire d'erreur) et le mot de passe que vous souhaitez. Cliquez sur le gros bouton « Sign Up », et vous accèderez à la page d'accueil de Spark Build.

![Spark Build](/assets/images/log-in.jpg)

Si vous vous êtes déjà connecté au Spark Build auparavant, cliquez sur le lien « Let me log in » juste sous le bouton « Sign Up », et vous arriverez sur une page d'authentification pour les utilisateurs existants. Ne vous inquiétez pas : si vous avez déjà un compte et cliquez accidentellement sur le bouton « Sign Up », nous vous connecterons à votre compte existant.

Spark Build, notre IDE web
---

![Spark Build](/assets/images/ide.png)

Spark Build est un environnement de développement intégré, ou IDE (Integrated Development Environment), ce qui signifie que vous pouvez faire du développement logiciel dans une application facile à utiliser, qui arrive à fonctionner dans votre navigateur.

Spark Build commence avec une barre de navigation sur la gauche. Au sommet se trouvent trois boutons qui fournissent des fonctionnalités importantes :

- **Flash** : Flashe le code actuel sur le Spark Core. Ça débute une *une mise à jour du firmware par les airs* et charge le nouveau code dans votre Spark Core.
- **Verify** : Compile le code sans le flasher sur le Core. S'il y a des erreurs, elles seront affichées dans la console de debug en bas de l'écran.
- **Save** : Sauve les modifications faites à votre code.

En bas de la barre de navigation se trouvent quatre autres boutons :

- **Code** : Affiche la liste de vos applications et vous permet de choisir celle à éditer / flasher.
- **Docs** : Vous envoie à la documentation.
- **Cores** : Affiche la liste de vos Spark Cores, de manière à choisir celui à flasher ou obtenir plus d'informations à son sujet.
- **Settings** : Change votre mot de passe, vous déconnecte, ou vous donne votre jeton d'accès pour les appels à l'API.

Spark Apps et bibliothèques de fonctions
---

![Spark Build](/assets/images/spark-apps.jpg)

Le cœur de Spark Build est la section « Spark Apps », qui affiche le nom de l'application courante dans l'éditeur ainsi que la liste des autres applications et les applications d'exemple de la communauté.

L'application que vous avez ouverte dans l'éditeur est affichée sous l'entête « Current App ». Vous remarquerez que cette application d'exemple « HELLOWORLD » a un seul fichier, mais les firmwares avec des bibliothèques de fonction ou plusieurs fichiers sont parfaitement gérés.

Depuis ce panneau, vous avez un certain nombre de boutons et actions disponibles qui peuvent vous aider à gérer votre bibliothèque de merveilleuses applications :

- **Create** : Vous pouvez créer une nouvelle application en cliquant sur le bouton « Create New App ». Donnez lui un joli nom, et appuyez sur Entrée. Votre application est maintenant sauvée dans votre compte et prête pour l'édition.

- **Delete** : Cliquez sur le bouton « Remove App » pour supprimer définitivement l'application de votre bibliothèque.

- **Rename** : Vous pouvez renommer votre application juste en double-cliquant sur son titre sous l'entête « Current App ». Vous pouvez modifier le champ « Optional description » de la même manière.

- **My Apps** : Vous en avez assez de travailler sur votre projet actuel ? Sélectionnez le nom d'une autre application sous l'entête « My apps » pour ouvrir cette dernière dans un onglet de l'éditeur Spark Build.

- **Files** : Cette entête liste tous les fichiers connus associés à l'application ouverte. Cliquez sur un des fichiers pour ouvrir celui-ci dans un nouvel onglet de l'éditeur.

- **Examples** : L'entête « Example apps » liste un nombre en perpétuelle augmentation d'applications de la communauté. Utilisez ces applications comme référence pour développer la votre, ou dupliquez les afin d'étendre leurs fonctionnalités.


Flasher votre première application
---

La meilleure façon de débuter avec l'IDE est de commencer à écrire du code :

- **Connectez vous** : Vérifiez que votre Core est allumé et émette des pulsations cyans, ce qui signifie qu'il est connecté au Spark Cloud et prêt à être mis à jour.

- **Récupérez du code** : Essayez de cliquer sur l'exemple « Blink a LED » sous l'entête « Example apps ». L'éditeur Spark Build devrait afficher le code de l'application d'exemple dans un onglet actif. Autrement, vous pouvez aussi copier / coller le morceau de code ci-dessous dans une nouvelle application de l'IDE.

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

- **Sélectionnez votre Core**: L'étape suivante est de vérifier que vous avez sélectionné le Core que vous souhaitez flasher. Cliquez sur l'icône « Cores » en bas à gauche de votre panneau de navigation, et cliquez sur l'étoile à côté du Core que vous souhaitez mettre à jour. Une fois le Core sélectionné, l'étoile associée passera au jaune.

- **Flashez** : Cliquez sur le bouton « Flash », et votre code sera envoyé à votre Core. Si le flash se termine avec succès, la LED sur le Core se mettra à clignoter en magenta.

![Spark Build](/assets/images/fork-app.jpg)

- **Dupliquez** : Vous auriez souhaité que le clignotement de la LED soit un peu plus rapide ? Essayez de cliquer sur le bouton « Fork This Example » après avoir sélectionné l'application d'exemple « Blink a LED ». Vous avez maintenant une copie personnelle que vous pouvez modifier, sauver et flasher sur tous vos Cores.

- **Editez** : Essayez de changer les valeurs dans la fonction delay() de 1000 à 250, ce qui va changer l'intervalle de clignotement de 1000 millisecondes à  250 millisecondes. Cliquez sur le bouton « Verify » puis le bouton « Flash ». La LED du Core clignote plus vite ? Bien joué :)


Informations du compte
---

Il y a aussi quelques autres trucs utiles dans Spark Build. L'IDE Spark Build est le meilleur outil pour voir les informations importantes au sujet de votre Core, gérer les Cores associés à votre compte Spark, et les « déréclamer » afin de pouvoir les transférer à votre ami.

![Spark Build](/assets/images/device-id.jpg)

- **Core ID** : Vous pouvez voir les Device ID de vos Cores en cliquant sur l'icône « Cores » en bas du panneau de navigation, puis en cliquant sur la flèche à côté du Core qui vous intéresse.

- **Unclaim** : Vous pouvez « déréclamer » un Core en cliquant sur le bouton « Remove Core » qui est affiché en cliquant sur la flèche à côté du Core correspondant. Une fois qu'un Core a été supprimé, il peut être associé à nouveau à n'importe quel compte utilisateur Particle.

![Spark Build](/assets/images/access-token.png)

- **API Key** : Vous pouvez trouver votre clé d'API la plus récente dans l'onglet « Settings » de votre compte. Vous pouvez cliquer sur le bouton « Reset Token » pour assigner une nouvelle clé à votre compte. *Notez* que cliquer sur ce bouton nécessitera que vous mettiez à jour tous les projets pour lesquels vous avez codé en dur cette clé.






La ligne de commande Spark
===

Les outils en ligne de commande Spark fournisse un jeu de fonctionnalités allant de la création du compte à l'interaction avec les Cores déployés, en passant par la vérification et flashage de code via le Spark Cloud. Vous trouverez plus de détails sur l'installation et toutes les choses intéressantes que vous pourrez faire avec [sur GitHub](https://github.com/particle-iot/spark-cli).

Déployer une application web Spark
===

**À venir** Nous vous donnerons les instructions pour déployer une application web sur Heroku qui pourra parler à un Spark Core.

Dépannage
===

Il existe de nombreuses raisons qui font que votre Core ne puisse pas se connecter à votre réseau Wi-Fi ou bien ne se comporte pas comme il le devrait.

[Jetez un œil à la section dépannage >](/#/troubleshooting)

