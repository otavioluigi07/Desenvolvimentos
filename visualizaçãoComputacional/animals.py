import os
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras import layers, models

# Diretórios contendo imagens de treino e teste
train_dir = 'data\cavalo\cavaloTreino'
test_dir = 'data\cavalo\cavaloTeste'


print(os.path.abspath(train_dir))
print(os.path.abspath(test_dir))

# Configurando a geração de dados aumentados para treino
train_datagen = ImageDataGenerator(rescale=1./255,
                                   rotation_range=40,
                                   width_shift_range=0.2,
                                   height_shift_range=0.2,
                                   shear_range=0.2,
                                   zoom_range=0.2,
                                   horizontal_flip=True,
                                   fill_mode='nearest')

# Configurando a geração de dados para teste (apenas reescala)
test_datagen = ImageDataGenerator(rescale=1./255)

# Carregando imagens de treino
train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(150, 150),
    batch_size=20,
    class_mode='binary'  # Usando 'binary' porque é uma classificação binária (cavalo ou não)
)

# Carregando imagens de teste
test_generator = test_datagen.flow_from_directory(
    test_dir,
    target_size=(150, 150),
    batch_size=20,
    class_mode='binary'  # Usando 'binary' porque é uma classificação binária (cavalo ou não)
)

# Criando o modelo
model = models.Sequential()
model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(150, 150, 3)))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(128, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Flatten())
model.add(layers.Dense(512, activation='relu'))
model.add(layers.Dense(1, activation='sigmoid'))

# Compilando o modelo
model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])

# Treinando o modelo
history = model.fit(train_generator, epochs=10, validation_data=test_generator)

# Avaliando o modelo
test_loss, test_acc = model.evaluate(test_generator)
print(f'Acurácia do modelo: {test_acc}')

# Plotando a acurácia e a perda ao longo do treinamento
acc = history.history['accuracy']
val_acc = history.history['val_accuracy']
loss = history.history['loss']
val_loss = history.history['val_loss']

epochs = range(len(acc))

plt.plot(epochs, acc, 'bo', label='Acurácia de Treino')
plt.plot(epochs, val_acc, 'b', label='Acurácia de Validação')
plt.title('Acurácia de Treino e Validação')
plt.legend()

plt.figure()

plt.plot(epochs, loss, 'bo', label='Perda de Treino')
plt.plot(epochs, val_loss, 'b', label='Perda de Validação')
plt.title('Perda de Treino e Validação')
plt.legend()

plt.show()
