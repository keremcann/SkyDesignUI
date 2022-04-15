import { useField } from 'formik';
import React from 'react';

export default function SkySelect(props) {
    const [field, meta, helpers] = useField(props.name);
    return (
        <form>
            <label>{props.label}</label>
            <select
                value={field.value}
                onChange={(e, d) => helpers.setValue(d.value)}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
            >
                <label color='red'>bla</label>
            </select>
        </form>
    )
}