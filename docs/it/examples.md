Esempi
=======

Qui troverete diversi esempi per cominciare a lavorare con il vostro nuovo Spark Core!

Lampeggiare un LED
===

![One LED illustration](images/annotated-example1.jpg)

Far lampeggiare un LED è il programma di esempio ["Hello World"](http://en.wikipedia.org/wiki/Hello_world_program) per il mondo dei microprocessori. È un modo carino per scaldarsi e iniziare il viaggio nel modo dell'hardware embedded.

Per questo esempio avete bisogno di uno Spark Core (già!), una Breadboard, un LED, una resistenza (vedremo dopo di trovarne il valore) e un cavo USB.

Collegate il tutto come sull'immagine a fianco. Il LED è connesso con il pin D0 del Core. Il pin positivo del LED (quello più lungo) è collegato al pin D0 e quello negativo (più corto) è connesso a massa tramite una resistenza.

![One LED setup](images/breadboard-one-led.jpg)

Un momento, qual'è il valore della resistenza?

*Ecco come possiamo trovarlo:*

Secondo la [legge di Ohm](http://it.wikipedia.org/wiki/Legge_di_Ohm) : Tensione = Corrente x Resistenza

Quindi Resistenza = Tensione / Corrente

Nel nostro caso, la tensione di uscita del Core è 3.3V ma il LED (normalmente) ha una caduta di tensione di ca. 2.0V. La tensione effettiva è quindi:

3.3V - 2.0V = 1.3V

La corrente necessaria per far illuminare un LED varia tra 2mA a 20mA. Più corrente, più luminosità. Generalmente è una buona idea di usare il LED al suo limite inferiore per prolungarne la vita. Sceglieremo una corrente di 5mA.

Quindi, Resistenza = 1.3V/ 5mA = 260 Ohms

**NOTA:** Visto che ci sono talmente tanti valori della caduta di tensione dei LEDs a dipendenza dal tipo, grandezza, colore, produttore, ecc. potrete usare con successo dei valori tra 220 Ohms e 1K Ohms.

Nell'immagine abbiamo usato una resistenza da 1K (Marrone Nero Rosso)

Adesso il programma:

```cpp
// Programma per far lampeggiare un LED collegato al pin D0
// dello Spark Core. 

// Diamo il nome led al pin D0
int led = D0; 

// Questa routine gira una sola volta dopo il reset
void setup() 
{
  // Inizializzare il pin D0 come output
  pinMode(led, OUTPUT);
}

// Questa routine gira per sempre 
void loop() 
{
  digitalWrite(led, HIGH);   // Accendi il LED
  delay(1000);               // Aspetta per 1000mS = 1 secondo
  digitalWrite(led, LOW);    // Spegni il LED
  delay(1000);               // Aspetta per un secondo
}
```

Controllare i LEDs via rete
===

![Two LED setup](images/breadboard-two-leds.jpg)

Adesso che sappiamo come far lampeggiare un LED, come sarebbe controllarlo via Internet? Ecco dove comincia il divertimento.

Questa volta colleghiamo due LEDs.

Questo è l'algoritmo: 

- Definire i pins che hanno un LED attaccato come outpu
- Creare e registrare una funzione Spark (questa viene chiamata automaticamente quando fate una richiesta API)
- Analizzare il comando in entrata e agire di conseguenza

```cpp
// -----------------------------------
// Controllare dei LEDs via Internet
// -----------------------------------

// nome dei pins
int led1 = D0;
int led2 = D1;

// Questa routine gira una sola volta dopo il reset
void setup()
{
   //Registrare la funzione Spark
   Spark.function("led", ledControl);

   // Configurare i pins come output
   pinMode(led1, OUTPUT);
   pinMode(led2, OUTPUT);

   // Inizializzare entrambi i LEDs come spenti
   digitalWrite(led1, LOW);
   digitalWrite(led2, LOW);
}


// Questa routine gira per sempre 
void loop()
{
   // Niente da fare qui
}


// Questa funzione viene chiamata ogni volta che c'è una richiesta API corrispondente
// il formato dello string di comando è l<numero led>,<stato>
// per esempio: l1,HIGH o l1,LOW
//              l2,HIGH o l2,LOW

int ledControl(String command)
{
   int state = 0;
   //trovare il numero di pin e convertire il valore ascii a integer
   int pinNumber = (command.charAt(1) - '0') - 1;
   //Controllare se il numero di pin è nei limiti
   if (pinNumber < 0 || pinNumber > 1) return -1;

   // trovare lo stato del led
   if(command.substring(3,7) == "HIGH") state = 1;
   else if(command.substring(3,6) == "LOW") state = 0;
   else return -1;

   // scrivere sul pin appropriato
   digitalWrite(pinNumber, state);
   return 1;
}
```

---

La richiesta API dovrebbe essere qualcosa del genere:

```json
POST /v1/devices/{DEVICE_ID}/led

# ESEMPIO DI RICHIESTA DA TERMINAL
# Core ID è 0123456789abcdef01234567
# Il vostro access token è 1234123412341234123412341234123412341234
curl https://api.spark.io/v1/devices/0123456789abcdef01234567/led \
  -d access_token=1234123412341234123412341234123412341234 \
  -d params=l1,HIGH
```

Notate che la fine della chiamata API è 'led' e non 'ledControl'. Questo perchè il punto finale è definito dal primo argomento di Spark.function(), che è una stringa di caratteri piuttosto che il secondo parametro che è invece una funzione.

Per comprendere meglio il concetto delle chiamate API al Core via cloud controllate la [referenza Cloud API.](/#/api)

Misurare la temperatura
===

![Read Sensor](images/annotated-example3.jpg)

Abbiamo imparato come mandare dei comandi al Core per controllare dell'hardware. Ma come funziona invece leggere dei dati dal Core?

In questo esempio collegheremo un sensore di temperatura al Core e leggeremo i valori via internet con un browser web.

![Read Temperature](images/breadboard-temp-sensor.jpg)

Abbiamo usato un sensore molto comune chiamato TMP36 di Analog Devices. Potete scaricare le [specifiche qui.](http://www.analog.com/static/imported-files/data_sheets/TMP35_36_37.pdf)

Notate come alimentiamo il sensore dal pin 3.3V\* invece che da quello regolare 3.3V. Questo perchè il pin 3.3V\* offre una tensione pulita e filtrata, ideale per applicazioni analogiche come questa. Se le letture che ottenete sono disturbate o inconsistenti, aggiungete un condensatore in ceramica da 0.1uF (100nF) tra il pin analogico di entrata (in questo caso A0) e la massa GND come illustrato nell'immagine.

```C++
// ----------------------
// Leggere la temperatura
// ----------------------

// Creare una variabile per salvare il valore della temperatura
int temperature = 0;

void setup()
{
  // Registrare una variabile Spark
  Spark.variable("temperature", &temperature, INT);

  // Connettere il sensore di temperatura a A0 e configurarlo
  // come inputt
  pinMode(A0, INPUT);
}

void loop()
{
  // Continuare a leggere la temperatura in modo che quando
  // si fa una chiamata API per leggere il valore, abbiamo l'ultimo
  temperature = analogRead(A0);
}
```

Il valore proveniente dal Core avrà un valore tra 0 e 4095. Lo si può
facilmente convertire alla temperatura attuale usando la seguente formula:

```
tensione = (lettura sensore x 3.3)/4095
Temperatura (in Celsius) = (tensione - 0.5) X 100
```

---

La richiesta API è qualcosa del genere:

```json
GET /v1/devices/{DEVICE_ID}/temperature

# ESEMPIO DI RICHIESTA DA TERMINAL
# Core ID è 0123456789abcdef01234567
# Il vostro access token è  1234123412341234123412341234123412341234
curl -G https://api.spark.io/v1/devices/0123456789abcdef01234567/temperature \
  -d access_token=1234123412341234123412341234123412341234
```

Comunicazione locale
===

Now let's imagine you want to control your Core locally,
so you build a simple server app to which the Core will directly connect.
One puzzle to solve is that you don't know in advance the
IP address of your Core or of the laptop that will run the server.
How can the Core and the server discover each other?

In this example, we will register a Spark function to pass the
server IP address to the Core.  Once we've established the
local connection, we'll be able to control the Core without
the data going through the Spark Cloud.

---

```C++
TCPClient client;
```

First, we construct the client that will connect to our local server.

---

```C++
void ipArrayFromString(byte ipArray[], String ipString) {
  int dot1 = ipString.indexOf('.');
  ipArray[0] = ipString.substring(0, dot1).toInt();
  int dot2 = ipString.indexOf('.', dot1 + 1);
  ipArray[1] = ipString.substring(dot1 + 1, dot2).toInt();
  dot1 = ipString.indexOf('.', dot2 + 1);
  ipArray[2] = ipString.substring(dot2 + 1, dot1).toInt();
  ipArray[3] = ipString.substring(dot1 + 1).toInt();
}
```

Then we need a function for translating the IP address String into
the array of four bytes needed by the TCP client.

We work our way progressively through the string, saving the
positions of the dots and the numeric substrings between them.

---

```C++
int connectToMyServer(String ip) {
  byte serverAddress[4];
  ipArrayFromString(serverAddress, ip);

  if (client.connect(serverAddress, 9000)) {
    return 1; // successfully connected
  } else {
    return -1; // failed to connect
  }
}
```

Here's the Spark function we're going to register.
Like all Spark functions it takes a String parameter
and returns an int.  We allocate an array of 4 bytes
for the IP address, then call `ipArrayFromString()`
to convert the String into an array.

After that, we simply call `client.connect()` with the
newly received address! Super simple!

---

```C++
void setup() {
  Spark.function("connect", connectToMyServer);

  for (int pin = D0; pin <= D7; ++pin) {
    pinMode(pin, OUTPUT);
  }
}
```

In `setup()` we only have two jobs:

* Register the Spark function
* Set D0–D7 as output pins

---

```C++
void loop() {
  if (client.connected()) {
    if (client.available()) {
      char pin = client.read() - '0' + D0;
      char level = client.read();
      if ('h' == level) {
        digitalWrite(pin, HIGH);
      } else {
        digitalWrite(pin, LOW);
      }
    }
  }
}
```

In `loop()` we first check whether the client is connected
to the server.  If not, we don't do anything.

If the client is connected, then we ask whether any commands
have been received over local communication.  If not, again,
we don't do anything.

However, if we are *connected* and have *received a command*
then we use the command to perform a `digitalWrite()`.

[Example server and firmware on github >](https://github.com/spark/local-communication-example)

texting the core
===

**coming soon!**

an internet button
===

**coming soon!**
