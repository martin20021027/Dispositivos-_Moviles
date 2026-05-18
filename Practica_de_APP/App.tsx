// Este StatusBar es para manejar la barra de arriba del celular (hora, batería, señal).
import { StatusBar } from 'expo-status-bar';   

//El StyleSheet es para crear estilos (colores, tamaños, etc.)
//El Text es para mostrar texto
//El View es como un contenedor/caja (como un <div> en web)
//El Button es para crea un botón
//El ImageBackground es para poner una imagen de fondo
import { StyleSheet, Text, View, ImageBackground, TextInput  } from 'react-native'; 

//El useState es para guardar y cambiar datos (estado), en mi caso lo uso para cambiar las fotos
import { useState, useEffect  } from 'react'; 

//El TouchableOpacity es para crear botones personalizados.
import { TouchableOpacity } from 'react-native';

export default function App() {

  const imagenes = [
    require('./assets/leon.jpg'),
    require('./assets/lobo.jpeg'),
    require('./assets/auto.jpg'),
    require('./assets/auto1.jpg'),
    require('./assets/yugioh.jpg'),
  ];

  const [index, setIndex] = useState(0);

  const cambiarImagen = () => {
    setIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
  };

  const imagenAnterior = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1
    );
  };

  const [meGusta, setMeGusta] = useState(new Array(imagenes.length).fill(0));
  const [noMeGusta, setNoMeGusta] = useState(new Array(imagenes.length).fill(0));

  const [comentarios, setComentarios] = useState(
    new Array(imagenes.length).fill("")
  );

  const [texto, setTexto] = useState("");

  const darMeGusta = () => {
    const nuevos = [...meGusta];
    nuevos[index]++;
    setMeGusta(nuevos);
  };

  const darNoMeGusta = () => {
    const nuevos = [...noMeGusta];
    nuevos[index]++;
    setNoMeGusta(nuevos);
  };

  const guardarComentario = () => {
    const nuevos = [...comentarios];
    nuevos[index] = texto;
    setComentarios(nuevos);
    setTexto("");
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
        }, 3000);
         return () => clearInterval(intervalo);
  }, []);

  const nombres = ["León", "Lobo", "Auto", "Auto 2", "Yu-Gi-Oh"];

  return (
    <ImageBackground
      source={imagenes[index]}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>

        
        <View style={styles.contenidoArriba}>
          <Text style={styles.titulo}>Hola Martin </Text>
          <Text style={styles.subtitulo}>Bienvenido a tu APP</Text>

          <View style={styles.botones}>
            <TouchableOpacity style={styles.boton} onPress={imagenAnterior}>
              <Text style={styles.textoBoton}>Anterior</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.boton} onPress={cambiarImagen}>
              <Text style={styles.textoBoton}>Siguiente</Text>
            </TouchableOpacity>
          </View>

         
          <Text style={{ color: 'white', marginTop: 10 }}>
            {nombres[index]}
          </Text>
        </View>

         
        <View style={styles.seccionInteraccion}>
          <TouchableOpacity style={styles.botonLike} onPress={darMeGusta}>
            <Text style={styles.textoBoton}>👍</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botonDislike} onPress={darNoMeGusta}>
            <Text style={styles.textoBoton}>👎</Text>
          </TouchableOpacity>

          <Text style={{ color: 'white', marginTop: 10 }}>
            👍 {meGusta[index]} 👎 {noMeGusta[index]}
          </Text>
        </View>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'space-between', // 🔥 clave
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
    paddingTop: 40,
  },

  contenidoArriba: {
    alignItems: 'center',
  },

  titulo: {
    color: 'white',
    fontSize: 22,
    marginBottom: 10,
  },

  subtitulo: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },

  botones: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  boton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },

  textoBoton: {
    color: 'white',
    fontSize: 14,
  },

  seccionInteraccion: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom: 20,
  },

  botonLike: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },

  botonDislike: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
});
