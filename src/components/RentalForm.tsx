import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { AddressField } from './AddressField';

type FormValues = {
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  address: string;
  price: number;
  duration: number;
};

export function RentalForm() {
  const { register, handleSubmit, formState, setValue, getValues } =
    useForm<FormValues>();
  const [submitted, setSubmitted] = useState(false);
  const { errors } = formState;
  const onSubmit = (data: FormValues) => {
    console.log(data);
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="property-type-label">Тип недвижимости</InputLabel>
        <Select
          labelId="property-type-label"
          {...register('propertyType', { required: true })}
          error={!!errors.propertyType}
        >
          <MenuItem value="Квартира">Квартира</MenuItem>
          <MenuItem value="Дом">Дом</MenuItem>
          <MenuItem value="Комната">Комната</MenuItem>
          <MenuItem value="Офис">Офис</MenuItem>
          <MenuItem value="Склад">Склад</MenuItem>
          <MenuItem value="Земельный участок">Земельный участок</MenuItem>
        </Select>
      </FormControl>

      <TextField
        {...register('bedrooms', { required: true })}
        type="number"
        label="Количество спален"
        error={!!errors.bedrooms}
        helperText={errors.bedrooms ? 'Это поле обязательно' : null}
        fullWidth
        margin="normal"
      />

      <TextField
        {...register('bathrooms', { required: true })}
        type="number"
        label="Количество ванных комнат"
        error={!!errors.bathrooms}
        helperText={errors.bathrooms ? 'Это поле обязательно' : null}
        fullWidth
        margin="normal"
      />

      <TextField
        {...register('squareFootage', { required: true })}
        type="number"
        label="Площадь объекта"
        error={!!errors.squareFootage}
        helperText={errors.squareFootage ? 'Это поле обязательно' : null}
        fullWidth
        margin="normal"
      />

      <AddressField
        value={getValues('address')}
        setValue={(value) => setValue('address', value)}
      />

      <TextField
        {...register('price', { required: true })}
        type="number"
        label="Цена аренды"
        error={!!errors.price}
        helperText={errors.price ? 'Это поле обязательно' : null}
        fullWidth
        margin="normal"
      />

      <TextField
        {...register('duration', { required: true })}
        type="number"
        label="Длительность аренды"
        error={!!errors.duration}
        helperText={errors.duration ? 'Это поле обязательно' : null}
        fullWidth
        margin="normal"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={submitted}
        fullWidth
      >
        {submitted ? 'Отправлено!' : 'Отправить'}
      </Button>
    </form>
  );
}
