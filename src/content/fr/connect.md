Connecter votre Core
===

<iframe class="vine-embed" src="https://vine.co/v/hFHPMue5lgd/embed/simple" width="320" height="320" frameborder="0"></iframe>

La méthode la plus simple pour connecter votre Spark Core au Wi-Fi est d'utiliser l'application mobile Spark pour iPhone ou Android. Mais si cette méthode ne fonctionne pas pour vous ou bien que vous n'ayez pas de téléphone iOS/Android, il existe d'autres méthodes.

Pour toutes les méthodes suivantes, le Spark Core doit être en mode « d'écoute », qui se caractérise par le clignotement de sa LED bleue.

<iframe class="vine-embed" src="https://vine.co/v/hFHlpBDELeU/embed/simple" width="320" height="320" frameborder="0"></iframe>

Le Core démarre en mode d'écoute par défaut, donc si votre Core est tout neuf, il devrait directement se mettre en mode d'écoute. Dans le cas contraire, appuyez sur le bouton mode pendant trois secondes.

## Smart Config avec l'application Spark

<iframe class="vine-embed" src="https://vine.co/v/hFH09MJwbxg/embed/simple" width="320" height="320" frameborder="0"></iframe>

Une fois que vous avez téléchargé l'application Spark Core depuis l'App Store ou Google Play, vous devriez créer un compte. Après cette étape, il vous sera demandé de connecter votre Core en utilisant un processus appelé Smart Config. Si votre Core possède un connecter u.FL, vous devez connecter une antenne externe avant de lancer Smart Config. *NOTE : Votre téléphone doit être connecté au réseau Wi-Fi auquel vous souhaitez connecter votre Core.* L'application remplira automatiquement le champ SSID avec le nom du réseau auquel votre téléphone est connecté. Saisissez ensuite votre mot de passe Wi-Fi, et appuyez sur « Connect ».

<iframe class="vine-embed" src="https://vine.co/v/hFwubhA3JXV/embed/simple" width="320" height="320" frameborder="0"></iframe>

Smart Config peut prendre jusqu'à une minute, donc soyez patient. Le plus proche est votre téléphone de votre Spark Core, le plus rapidement il se connectera. Une fois que le Core capte le signal, il passera par la séquence lumineuse suivante :

- **Bleu fixe** : Identifiants capturés
- **Clignotements verts** : Connexion au réseau Wi-Fi
- **Clignotements cyans** : Connexion au Spark Cloud
- **Pulsations cyans** : Connecté au Spark Cloud

<iframe class="vine-embed" src="https://vine.co/v/hFdj1TJjA9M/embed/simple" width="320" height="320" frameborder="0"></iframe>

Une fois que le Spark Core sera connecté, votre téléphone « réclamera » ce dernier et le rattachera à votre compte. Ensuite, il ne vous restera plus qu'à donner un nom à votre Core. Si vous n'êtes pas certain, vous pouvez confirmer que le processus de réclamation s'est terminé avec succès en vous connectant sur l'[IDE Spark](https://www.spark.io/build) et en cliquant sur l'icône « Cores » en bas de la page. Votre Core est dans la liste ? Bravo ! Tous est pour le mieux en ce bas monde.

*NOTE: Le Core **DOIT** être connecté (pulsations cyan) pour que le processus de réclamation fonctionne. Si le Spark Core a été réclamé par quelqu'un d'autre, l'application ne le reconnaitra pas. Si vous devez transférer votre Spark Core vers un autre compte, envoyez nous un mail à [hello@spark.io](mailto:hello@spark.io).*

<iframe class="vine-embed" src="https://vine.co/v/hFdPKul226i/embed/simple" width="320" height="320" frameborder="0"></iframe>

Si vous connectez plusieurs Cores, vous passerez par ce processus de nommage pour chaque Core. Vous saurez qui est qui grâce au « signal arc en ciel ».

<iframe class="vine-embed" src="https://vine.co/v/hFdxB9lHOmv/embed/simple" width="320" height="320" frameborder="0"></iframe>

Une fois que vous avez fini de nommer vos Cores, vous pouvez les contrôler à l'aide de Tinker ! Essayez *digitalWrite* sur D7 pour allumer la LED utilisateur.

## Smart Config avec l'application TI

Smart Config avec l'application pour Texas Instrument CC3000 est similaire au processus ci-dessus, même si vous n'avez pas besoin de compte Spark, et que TI propose aussi une applet Java qui peut fonctionner sur Mac, Windows ou Linux.

Suivez les instructions sur le site de Texas Instruments

[CC3000 Smart Config @ Texas Instruments](http://processors.wiki.ti.com/index.php/CC3000_Smart_Config)

La seule chose différente est que vous aurez besoin d'activer la clé AES optionnelle et saisir `sparkdevices2013`. 

*NOTE : L'application Android de TI n'est pas disponible sur Google Play. Vos devrez la télécharger vous même depuis leur site, et charger l'apk vous même.*

## Connexion via USB

Vous pouvez aussi connecter le Spark Core à votre réseau Wi-Fi à l'aide d'une communication Série par USB. *NOTE : Ceci fonctionne uniquement quand le Spark Core est en mode d'écoute (comprendre : la LED RVB clignote en bleu)*.

Tout d'abord, vous devez télécharger une application de terminal série.

Pour les utilisateurs de __Windows__, nous vous recommandons [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/).
Vous devez aussi installer les pilotes Windows :


[Pilotes Windows pour Spark Core >](https://s3.amazonaws.com/spark-website/Spark.zip)

[CoolTerm](http://freeware.the-meiers.org/) fourni aussi une interface graphique agréable.
![Paramétrages CoolTerm]({{assets}}/images/coolterm-settings.png)
![Configuration CoolTerm]({{assets}}/images/coolterm-setup.png)

Pour les utilisateurs __Mac__, tant CoolTerm que screen fonctionnent.

Pour l'utilisation de __Linux__ en ligne de commande, [GNU Screen](https://www.gnu.org/software/screen/) fonctionne très bien.
(Avec OS X, la ligne de commande devrait ressembler à `screen /dev/cu.usbmodem1411 9600`.
Avec  Ubuntu, ça ressemble à `screen /dev/ttyACM0 9600`. L'emplacement du périphérique peut être différent, fouillez dans le répertoire `/dev`si vous ne le trouvez pas immédiatement)

__Comment faire__

Branchez votre Spark Core à votre ordinateur via USB. Quand le Spark Core est en mode d'écoute, ouvrez un port série USB en utilisant les paramètres standards, à savoir :

- Baudrate: 9600
- Data Bits: 8
- Parity: none
- Stop Bits: 1

Une fois que la connexion série est ouverte, vous avez deux commandes à votre disposition en tapant soit **w** ou **i** sur le clavier. Voici ce qu'elles font :

- **w** : Configure les identifiants de votre réseau Wi-Fi (SSID et mot de passe)
- **i** : (« i » comme identifier) Affiche l'ID du Spark Core

**NOTE :** Si vous connectez votre Core via USB pour la première fois, vous devrez aussi *réclamer* manuellement votre Core pour le connecter à votre compte. Veuillez jeter un œil à la section plus bas nommée [Réclamer votre Core](/#/connect/réclamer-votre-core)

## À venir : Identifiants en codés en dur

À l'heure actuelle, il n'existe pas de mécanisme pour coder en dur votre SSID et mot de passe dans le firmware du Spark Core. Nous y travaillons !

Réclamer votre Core
===

Une fois que votre Core est connecté, il doit être *réclamé* afin de pouvoir être associé à votre compte. C'est que qui vous permet, et uniquement vous, de contrôler votre Core.

Si vous utilisez l'application mobile pour configurer votre Core, il devrait être automatiquement réclamé. Cependant, si vous connectez votre Core via USB, ou que que le processus de réclamation a échoué, vous pouvez le réclamer manuellement.

Tout d'abord, vous devez obtenir l'ID de votre Core. Vous pouvez faire ça en ouvrant une connexion série vers le Core et en appuyant sue la touche **i** (voyez ci-dessus les instructions pour la connexion série via USB). Ça devrait vous afficher un numéro comme suit :

    # Exemple d'ID de Core
    55ff68064989495329092587

---

Puis accédez à [Spark Build](https://www.spark.io/build) et cliquez sur l'icône « Cores ». Cliquez sur le bouton affichant « Add a Core », et entrez votre ID dans le champ texte.

Nous mettrons à disposition un outil en ligne de commande qui simplifiera le processus. Restez à l'écoute !


APPENDICE
===

## Mode DFU (Device Firmware Upgrade / Mise à jour du firmware du périphérique)

Si vous souhaitez programmer un Core avec un firmware personnalisé via USB, vous devrez utiliser ce mode. Ce mode déclenche le bootloader embarqué qui accepte un binaire de firmware via dfu-utils.

Procédure:

Enfoncez les deux boutons, puis relâchez le bouton RST, tout en laissant enfoncé le bouton MODE. Relâchez le bouton MODE dès que la LED commence à clignoter en jaune. Le Core est maintenant en mode DFU.


<iframe class="vine-embed" src="https://vine.co/v/MahhI1Fg7O6/embed/simple" width="320" height="320" frameborder="0"></iframe>


## Remise au paramètres d'usine

Une remise au paramètres d'usine restaure le firmware sur le Core avec l'application Tinker et supprime toutes vos informations Wi-Fi.

Procédure: 

La procédure est la même que celle décrite ci-dessus (mode DFU), mais dans ce cas vous devez continuer d'appuyer sur le bouton MODE jusqu'à ce que le Core passe du clignotement en jaune au clignotement en blanc. Puis relâchez le bouton. Le Core devrait commencer à clignoter en bleu une fois la remise aux paramètres d'usine terminée.

**Note :** La vidéo ci-dessous est la suite de la vidéo précédente (mode DFU).

<iframe class="vine-embed" src="https://vine.co/v/MahOmIaX2xP/embed/simple" width="320" height="320" frameborder="0"></iframe>
