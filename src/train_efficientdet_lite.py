import os
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
import efficientdet.keras as efficientdet_keras

IMAGE_SIZE = 320
BATCH_SIZE = 32
EPOCHS = 50
LEARNING_RATE = 0.001
TRAIN_DIR = 'path/to/preprocessed/train'
VAL_DIR = 'path/to/preprocessed/val'
MODEL_DIR = 'path/to/save/model'

train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)

val_datagen = ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow_from_directory(
    TRAIN_DIR,
    target_size=(IMAGE_SIZE, IMAGE_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical'
)

val_generator = val_datagen.flow_from_directory(
    VAL_DIR,
    target_size=(IMAGE_SIZE, IMAGE_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical'
)

model = efficientdet_keras.EfficientDetLiteB0(input_shape=(IMAGE_SIZE, IMAGE_SIZE, 3), num_classes=train_generator.num_classes)
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=LEARNING_RATE),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

early_stopping = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)
model_checkpoint = ModelCheckpoint(os.path.join(MODEL_DIR, 'efficientdet_lite_best.h5'), save_best_only=True, monitor='val_loss')

history = model.fit(
    train_generator,
    epochs=EPOCHS,
    validation_data=val_generator,
    callbacks=[early_stopping, model_checkpoint]
)

model.save(os.path.join(MODEL_DIR, 'efficientdet_lite_final.h5'))