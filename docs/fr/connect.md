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
![Paramétrages CoolTerm](images/coolterm-settings.png)
![Configuration CoolTerm](images/coolterm-setup.png)

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

Dépannage
===

Il y a plein de raisons pour lesquelles votre Spark Core ne pourrait pas se connecter à votre réseau. Il existe un grand nombre de types de réseaux Wi-Fi, et le Spark Core et le CC3000 ne les gèrent pas tous. Nous considérons comme importante la facilité de se connecter au maximum de réseaux possibles, et vos retours sont extrêmement précieux pour que nous puissions nous améliorer.

Le Spark Core fonctionne mieux dans un réseau domestiques traditionnel : un réseau simple avec une sécurité WPA/WPA2 ou WEP (ou sans sécurité), avec un unique routeur de marque connue (Apple, Netgear, Linksys, D-Link, etc.) sans réglages exotiques. Plus votre réseau s'éloignera de la norme, plus vous aurez de chance de rencontrer des problèmes.

Il existe quelques problèmes connus avec les types de réseau suivants :

- **Réseaux seulement 802.11n**. Le Spark Core est compatible uniquement 802.11b/g. La plupart des réseaux 802.11n sont compatibles avec le 802.11b/g, mais si ce n'est pas le cas du votre, le Spark Core ne se connectera pas.
- **Réseaux avec ["portail captif"](http://fr.wikipedia.org/wiki/Portail_captif)**. Un portail captif est le petit site qui apparait pour vous demander de vous identifier à un réseau ou de signer des conditions d'accès, comme chez Starbucks. Le Spark Core ne peut pas naviguer sur ces portails.
- **Réseaux d'entreprise**. Nous avons eu des résultats mitigés pour les connexions du Spark Core à des réseaux d'entreprise, si bien que nous ne savons pas vraiment la cause des problèmes rencontrés. C'est un point sur lequel nous travaillons.
- **Réseaux complexes**. Les réseaux avec plusieurs routeurs, des pare-feu non standards, et des paramètres atypiques.
- **Réseaux avec une sécurité WEP**. Si la connexion avec l'application mobile fonctionne dans votre cas, les réseaux WEP ne devraient pas poser de problème. Cependant, vous ne pouvez pas à l'heure actuelle vous connecter à des réseaux WEP par USB. Nous sommes en train d'implémenter un correctif pour ce point, il devrait être disponible d'ici une quinzaine de jours.
- **Canaux supérieurs à 11**. C'est un problème qui touche en particulier l'international. Si vous résidez en dehors des États-Unis, votre routeur Wi-Fi pourrait fonctionner sur les canaux 12, 13 ou 14, que le CC3000 ne gère pas. Veuillez utiliser les canaux 11 ou inférieurs.

Donc, détaillons un peu. Si votre Spark Core ne se connecte pas à votre réseau Wi-Fi, nous vous recommandons les étapes suivantes : 

## ÉTAPE 0 : Vérifiez les bases

Il existe quelques problèmes communs à vérifier en premier :

- Vérifiez les identifiants de votre réseau Wi-Fi (SSID et mot de passe) pour être certain qu'ils ont été correctement saisis.
- Vérifiez d'être à portée de votre réseau Wi-Fi. Si votre téléphone ou votre ordinateur ont une mauvaise connexion depuis le lieu actuel, essayez de vos rapprocher de votre point d'accès.
- Si vous utilisez un Core u.FL, vérifiez d'y avoir correctement connecté une antenne.
- Vérifiez que votre Core reçoit assez de courant pour transmettre ses signaux Wi-Fi (300 mA en pointe). Essayez une autre alimentation, ou débranchez les composants qui consomment trop d'énergie.

## ÉTAPE 1 : Configurez votre Core via USB

Sur certains réseaux, Smart Config ne fonctionne pas, mais le Core peut quand même si connecter sans problème. Nous avons implémenté un mécanisme de secours de façons à ce que vous puissiez configurer votre Core via USB. Pour les instructions, voyez plus bas. N'oubliez pas que vous devrez réclamer votre Core manuellement si ce n'a pas été fait précédemment.

## ÉTAPE  2 : Essayez un autre réseau

Il y a de nombreuses raisons qui font que votre Core ne puisse de connecter. Certaines d'entre elles sont dues au Spark Core, certaines sont dues à l'envoi des informations Wi-Fi par votre téléphone mobile, certaines sont dues au réseau. Si votre Core ne se connecte pas, essayez un autre réseau Wi-Fi. Ça vous aidera à cerner le type de problème auquel vous faites face.

## ÉTAPE 3 : Redémarrez et videz la mémoire

<iframe class="vine-embed" src="https://vine.co/v/hFHQlj6iuKT/embed/simple" width="320" height="320" frameborder="0"></iframe>

Fréquemment, le matériel électronique se remet à fonctionner après avoir été éteint puis rallumé. Essayez :

- Relancez votre application mobile
- Débranchez puis branchez à nouveau le Spark Core
- Effacez de la mémoire du Spark Core ses réseaux Wi-Fi en laissant appuyé le bouton MODE pendant 10 secondes. Après 3 secondes, la LED devrait se mettre à clignoter en bleu. Après 10 secondes, il devrait y avoir une salve de clignotements bleus rapides. Cela signifie que la mémoire a été effacée.
- Restorez le firmware du Spark Core à ses réglages d'usine. Faire ceci peut être peut évident, regardez [cette vidéo](https://community.spark.io/t/how-to-do-a-factory-reset/2579) pour savoir comment faire.

## ÉTAPE 4 : Vérifiez les paramètres de votre routeur

Il existe des millions de manières pour que les réglages d'un routeur pose des problèmes, mais voici quelques éléments à vérifier :

- **Utilisez DHCP**. Bien que le Spark Core sache gérer les adresses IP statiques, il n'est pas configuré pour ça par défaut, donc vous allez devoir fouiller dans le code source.
- **Stoppez les contrôles d'accès et pare-feu**. Pas de manière permanente, mais temporairement, pour voir ci ça résout le problème. Si c'est bien le cas, vous pouvez surement affiner vous réglages pour tenir compte du Core plutôt que de désactiver la sécurité. La seule modification que vous pourriez avoir à apporter est d'ouvrir le port 5683 en sortie, qui est le port [CoAP](http://en.wikipedia.org/wiki/Constrained_Application_Protocol) par défaut qu'utilise le Spark Core pour se connecte au Spark Cloud. Si votre Core clignote en cyan et de temps en temps en rouge, les problèmes de routeur sont surement les coupables.

## ÉTAPE 5 : Consultez les forums

Il est possible que d'autres personnes aient rencontré le même problème que vous. La meilleure manière de le vérifier et d'apprendre des autres est de chercher dans les forums. Cherchez pour vos symptômes en particulier ou bien la marque et le modèle de votre routeur pour trouver des posts correspondants.

[Visitez les forums >](https://community.sparkdevices.com)

## ÉTAPE 6 : Envoyez un rapport d'erreur

Nous aimerons entendre parler de vos problèmes, que vous ayez ou non été capable de les résoudre, de telle manière que nous puissions améliorer notre plateforme. Si vous n'avez pas été capable de résoudre votre problème, nous espérons que nous même ou la communauté serons capable de vous aider.

Veuillez poster au sujet de vos problèmes de connectivité dans un topic déjà existant, ou bien dans un nouveau topic s'ils ne sont pas semblables à ceux déjà reportés. Quand vous créez un post, veuillez inclure :

- Marque et modèle du routeur
- Sécurité du réseau (aucune, WEP, WPA2, etc.)
- Environnement (maison, bureau, entreprise, réseau public, etc.)
- Topologie du réseau (nombre de routeur ou d'extendeurs de réseau, nombre estimé de périphériques connectés au réseau)
- Fournisseur d'accès Internet
- Tout paramètre du réseau qui pourrait diverger de la norme

Dépannage à l'aide des couleurs
===

Le Spark Core possède une LED RVB placée à l'avant qui sert à afficher son état de connexion. Cette LED peut vous aider à comprendre ce qui se passe et corriger les erreurs que vous pourriez rencontrer.

## Clignotement bleu

<iframe class="vine-embed" src="https://vine.co/v/hFHPMue5lgd/embed/simple" width="320" height="320" frameborder="0"></iframe>

- *Que fait le Core ?* Mon Core clignote en bleu.
- *Quel est le problème ?* Votre Core n'a pas les identifiants Wi-Fi pour rejoindre votre réseau local
- *Comment puis-je le corriger ?*

À l'instant, votre Core ne possède pas les informations dont il a besoin pour se connecter à votre réseau local Wi-Fi. Si vous ne l'avez pas déjà fait, essayez d'utiliser l'application Spark Core pour [iPhone](https://itunes.apple.com/us/app/spark-core/id760157884) ou [Android](https://play.google.com/store/apps/details?id=io.spark.core.android) pour envoyer les informations réseau à votre Core. Les instructions détaillées peuvent être trouvées [ici](/#/connect/smart-config-avec-l-application-spark).


Si ça ne fonctionne pas, essayez les étapes suivantes :

1. Si votre routeur gère le 802.11n, vérifiez qu'il gère aussi les anciens protocoles réseau, et qu'il est configuré pour ça (Le Core gère les réseaux 802.11 a/c)
2. Si vous avez un Core avec un connecteur u;FL, vérifiez que l'antenne est correctement attachée.
3. Essayez de [redémarrer le Core et d'effacer sa mémoire](/#/connect/depannage-etape-3-redemarrez-et-videz-la-memoire) 
4. Si vous utilisez un téléphone Android et que votre réseau n'a pas de mot de passe, vous ne pouvez actuellement pas utiliser l'application Spark Core pour envoyer les identifiants réseau à votre Core. À la place, essayez d'utiliser l'application [Smart Config de TI pour configurer votre Core](/#/connect/smart-config-avec-l-application-ti).
5. Essayez de configurer votre Core via USB. Les instructions peuvent être trouvées [ici](/#/connect/connexion-via-USB)
6. Si rien de tout ceci ne fonctionne, veuillez [contacter l'équipe Spark](mailto:hello@sparkdevices.com) et nous donner la marque et le modèle de votre smartphone.


---


## Clignotement vert

- *Que fait le Core ?* Mon Core clignote en vert [flashing green](https://mtc.cdn.vine.co/r/videos/DB9E0E87311015399731217969152_1d6c83d12a3.4.3.2795910212236322177_4RBA9frM0a4pwIG_RbZgo.ZOBEbBr_CpxzoOsBNuExDz6TFldcjJSYHVh203e6F4.mp4?versionId=orM0m0DvLYdciAwsb6DYHhqb974AHMj_), mais ne passe jamais au clignotement cyan.
- *Quel est le problème ?* Votre Core a reçu les identifiants réseau (SSID et mot de passe), mais ne peut toujours pas se connecter au réseau Wi-Fi.
- *Comment puis-je le corriger ?*

Veuillez suivre les étapes suivantes :

1. [Vérifiez les bases](/#/connect/verifiez-les-bases).
2. Essayez une autre alimentation. Vous devriez alimenter votre Core avec une alimentation capable de fournir au moins 500mA. Nous conseillons les adaptateurs secteur 5V/1A habituellement utilisés pour charger les téléphones mobiles.
3. Si votre réseau possède une page d'accueil, le Core sera incapable de se connecter. Essayez de configurer un autre réseau.
4. Essayez de [redémarrer le Core et d'effacer sa mémoire](/#/connect/depannage-etape-3-redemarrez-et-videz-la-memoire)
5. Essayez une remise aux paramètres d'usine. Laissez appuyés les deux boutons, puis relâchez le bouton RST tout en laissant enfoncé le bouton MODE. La LED commencera par clignoter en jaune. Laissez le bouton MODE enfoncé jusqu'à ce que le Core se mette à clignoter en blanc. Puis relâchez le bouton. Le core devrait ensuite se mettre à [clignoter en bleu](https://v.cdn.vine.co/r/videos/E465A8959B1015390893882101760_178fcfd2b3c.4.3.11510817618992331600_MIW9HE1mtZ9H_SpBlKdK1lv2UfmniExCFQHrgJ7iqiFDUiDb0E31bR7GwvB_7wz0.mp4?versionId=eS01KUZ6NaUZgEipSDeVi0rxZENByp1N) après que la remise au paramètres d'usine se soit terminée.
6. Essayez de relancer manuellement le programmeur pour mettre à jour le firmware du CC3000 via USB. Vous pourrez trouver les instructions détaillées [ici](https://community.sparkdevices.com/t/failed-connecting-to-wifi/648/53).
7. Si rien de tout ceci ne fonctionne, veuillez [contacter l'équipe Spark](mailto:hello@sparkdevices.com) et nous donner la marque et le modèle de votre point d'accès Wi-Fi.


---

## Clignotement jaune

- *Que fait le Core ?* Mon Core clignote en jaune quand je le branche ou quand j'appuie sur le bouton RST.
- *Quel est le problème ?* Il manque un firmware important sur votre Core
- *Comment puis-je le corriger ?*

Veuillez suivre les étapes suivantes :

1. Essayez d'appuyer sur le bouton RST afin d'être certain de ne pas avoir accidentellement configuré votre Core en mode DFU. 
2. Essayez une remise aux paramètres d'usine. Laissez appuyés les deux boutons, puis relâchez le bouton RST tout en laissant enfoncé le bouton MODE. La LED commencera par clignoter en jaune. Laissez le bouton MODE enfoncé jusqu'à ce que le Core se mette à clignoter en blanc. Puis relâchez le bouton. Le core devrait ensuite se mettre à [clignoter en bleu](https://v.cdn.vine.co/r/videos/E465A8959B1015390893882101760_178fcfd2b3c.4.3.11510817618992331600_MIW9HE1mtZ9H_SpBlKdK1lv2UfmniExCFQHrgJ7iqiFDUiDb0E31bR7GwvB_7wz0.mp4?versionId=eS01KUZ6NaUZgEipSDeVi0rxZENByp1N) après que la remise au paramètres d'usine se soit terminée.
3. Si la remise aux paramètres d'usine ne fonctionne pas, vous allez devoir écrire le firmware via DFU. Vous pouvez faire celà en suivant les étapes ci-dessous :

Installez dfu-util pour votre système, soit en utilisant homebrew sur un mac, http://dfu-util.gnumonks.org/ sous windows, ou bien depuis les sources sous linux :
        
    opkg install libusb-1.0-dev
    wget http://dfu-util.gnumonks.org/releases/dfu-util-0.7.tar.gz
    tar xvf dfu-util-0.7.tar.gz
    cd dfu-util-0.7
    ./configure
    make
    sudo make install

---

Une fois dfu-util installé, vous devriez pouvoir lancer avec votre Core connecté sur l'USB :
        
    sudo dfu-util -l

---

Ça devrait vous retourner une liste avec quelque chose comme [1d50:607f] dedans. Si c'est bien le cas, alors vous pouvez installer le firmware manquant (qui peut être trouvé ici : https://s3.amazonaws.com/spark-website/factory_firmware.bin)

    dfu-util -d 1d50:607f -a 1 -s 0x00020000 -D factory_firmware.bin
    dfu-util -d 1d50:607f -a 0 -s 0x08005000:leave -D factory_firmware.bin

Vous pouvez redémarrer votre Core, qui se mettra à [clignoter lentement en bleu](https://v.cdn.vine.co/r/videos/E465A8959B1015390893882101760_178fcfd2b3c.4.3.11510817618992331600_MIW9HE1mtZ9H_SpBlKdK1lv2UfmniExCFQHrgJ7iqiFDUiDb0E31bR7GwvB_7wz0.mp4?versionId=eS01KUZ6NaUZgEipSDeVi0rxZENByp1N), ou bien [clignoter en vert](https://mtc.cdn.vine.co/r/videos/DB9E0E87311015399731217969152_1d6c83d12a3.4.3.2795910212236322177_4RBA9frM0a4pwIG_RbZgo.ZOBEbBr_CpxzoOsBNuExDz6TFldcjJSYHVh203e6F4.mp4?versionId=orM0m0DvLYdciAwsb6DYHhqb974AHMj_) si tout à correctement fonctionné.

Si aucune de ces étapes ne fonctionne, veuillez [contacter l'équipe Spark](mailto:hello@sparkdevices.com).

---

## Clignotement orange (rouge/jaune)

- *Que fait le Core ?* Mon Core clignote jaune/rouge/orange après s'être connecté au Wi-Fi.
- *Quel est le problème ?* Une erreur de déchiffrage a eu lieu pendant la connexion au Spark Cloud.
- *Comment puis-je le corriger ?*


Veuillez suivre les étapes suivantes :

1. Toutes les instructions pour résoudre ce problème peuvent être trouvées dans les forums de la communauté Spark. Si ces dernières ne corrigent pas votre problème, veuillez [contacter l'équipe Spark](mailto:hello@sparkdevices.com).

[Remplacer les identifiants Spark Cloud >](https://community.sparkdevices.com/t/troubleshooting-my-core-is-flashing-yellow-red-lights-after-it-connects-to-wifi/627)

---

## Clignotement vert puis rouge

- *Que fait le Core ?* Mon Core commence par clignoter en vert quand il se connecte à mon réseau, puis la LED passe au rouge.
- *Quel est le problème ?* Votre Core rencontre un problème réseau et ne peut se connecter au Cloud.
- *Comment puis-je le corriger ?*

Il existe dans ce cas deux problèmes potentiels : soit votre réseau domestique n'a pas d'accès à Internet, soit nous rencontrons des problèmes avec nos serveurs.

1. Essayez de redémarrer votre routeur pour résoudre tout problème temporaire sur votre réseau Wi-Fi.
2. Essayez d'accéder à un site comme [Google](http://www.google.fr/) depuis votre ordinateur afin de vérifier que votre réseau Wi-FI est connecté à Internet et puisse accéder à des sites distants.
3. Vérifiez www.spark.io/status pour voir s'il n'y a pas de problème avec le Spark Cloud.
4. Si vous rencontrez toujours ce problème, veuillez [contacter l'équipe Spark](mailto:hello@sparkdevices.com).

---

## LED principale éteinte, petite LED bleue faible

- *Que fait le Core ?* La LED principale de mon Spark Core est éteinte, mais la petite LED bleue dans le coin haut-droit brille faiblement.
- *Quel est le problème ?* Votre Core n'a pas de firmware.
- *Comment puis-je le corriger ?*


2. Essayez une remise aux paramètres d'usine. Laissez appuyés les deux boutons, puis relâchez le bouton RST tout en laissant enfoncé le bouton MODE. La LED commencera par clignoter en jaune. Laissez le bouton MODE enfoncé jusqu'à ce que le Core se mette à clignoter en blanc. Puis relâchez le bouton. Le core devrait ensuite se mettre à [clignoter en bleu](https://v.cdn.vine.co/r/videos/E465A8959B1015390893882101760_178fcfd2b3c.4.3.11510817618992331600_MIW9HE1mtZ9H_SpBlKdK1lv2UfmniExCFQHrgJ7iqiFDUiDb0E31bR7GwvB_7wz0.mp4?versionId=eS01KUZ6NaUZgEipSDeVi0rxZENByp1N) après que la remise au paramètres d'usine se soit terminée.
3. Si vous ne voyez aucune LED clignoter pendant la remise au paramètres d'usine, alors votre Core pourrait être temporairement non fonctionnel. Si vous avez un shield JTAG, [contactez l'équipe Spark](mailto:hello@sparkdevices.com) de manière à ce qu'elle puisse vous aider à réinstaller le firmware du Core. Si vous n'avez pas de shield JTAG, [contactez l'équipe Spark](mailto:hello@sparkdevices.com) pour nous le faire savoir, et nous vous aiderons pour les étapes suivantes.

## LEDs éteintes et sans réactions

- *Que fait le Core ?* Mon Core n'affiche aucune activité des LED quand je l'alimente via USB.
- *Quel est le problème ?* Votre Core n'est pas alimenté.
- *Que puis-je faire pour le corriger ?*

Veuillez suivre les étapes suivantes :

1. Essayez d'alimenter le Core avec un autre câble USB et autre source d'électricité (par exemple un autre port USB de votre ordinateur)
2. Si ça ne résout pas le problème, votre Core pourrait avoir un court-circuit. Veuillez [contacter l'équipe Spark](mailto:hello@sparkdevices.com) pour plus d'aide.


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
