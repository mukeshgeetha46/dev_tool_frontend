// material-ui
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';
// project import

export default function Input({ field,touched,values,handleBlur,handleChange,errors }) {
  return (
    <Grid key={"grid"+field.name} item xs={12} md={field.width || 12}>
        {(field.type=='text')&&(
            <Stack spacing={1}>
            <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
            <OutlinedInput
            fullWidth
            error={Boolean(touched && errors)}
            id={field.name}
            type={field.text}
            value={values}
            name={field.name}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={field.placeholder || ""}
            inputProps={{}}
            startAdornment={field.startAdornment || false}
            endAdornment={field.endAdornment || false}
            />
        </Stack>
        )}
        {(field.type=='textarea')&&(
            <Stack spacing={1}>
            <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
            <OutlinedInput
                rows={field.rowCount}// number of rows
                multiline
                error={Boolean(touched && errors)}
                id={field.name}
                type={field.text}
                value={values}
                name={field.name}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder={field.placeholder || ""}
                inputProps={{}}
            />
            </Stack>
        )}
        {(field.type=='select')&&(
            <Stack spacing={1}>
            <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
            <Select
                error={Boolean(touched && errors)}
                value={values}
                name={field.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={field.placeholder || ""}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {field.options.map(row => (
                <MenuItem key={row.key} value={row.key}>
                   {row.value}
                </MenuItem>
            ))}
        </Select>
        </Stack>
        )}
        
        {touched && errors && (
            <FormHelperText error id={`helper-text-${field.name}`}>
            {errors}
            </FormHelperText>
        )}
        </Grid>
  );
}