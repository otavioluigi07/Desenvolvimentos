import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.datasets import fashion_mnist
from tensorflow.keras.utils import to_categorical

# Carregando os dados Fashion MNIST
(train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()

# Normalizando as imagens para um intervalo de 0 a 1
train_images = train_images.reshape((60000, 28, 28, 1)).astype('float32') / 255
test_images = test_images.reshape((10000, 28, 28, 1)).astype('float32') / 255

# Convertendo os rótulos para o formato one-hot
train_labels = to_categorical(train_labels)
test_labels = to_categorical(test_labels)

#Criando modelo
model = models.Sequential()
model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.Flatten())
model.add(layers.Dense(64, activation='relu'))
model.add(layers.Dense(10, activation='softmax'))

model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

#Treinando o modelo
model.fit(train_images, train_labels, epochs=10, batch_size=64, validation_data=(test_images, test_labels))

#Testando o modeo
test_loss, test_acc = model.evaluate(test_images, test_labels)
print(f'Acurácia do modelo: {test_acc}')

#Testando com uma imagem específica
import numpy as np
from tensorflow.keras.preprocessing import image

# Carregando uma imagem para teste (substitua pelo caminho da sua imagem)
image_path = 'data\eu\camiseta.jpg'
img = image.load_img(image_path, target_size=(28, 28), color_mode='grayscale')
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array = img_array / 255.0  # Normalizando a imagem

# Fazendo a previsão
predictions = model.predict(img_array)

# Obtendo a classe prevista
predicted_class = np.argmax(predictions)

print(f'A classe prevista é: {predicted_class}')
