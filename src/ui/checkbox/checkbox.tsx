import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import CheckIcon from '@mui/icons-material/Check';
import s from './checkbox.module.css'

type CheckboxProps = {
    onChange: (checked: boolean) => void
    checked: boolean
}

const CircleCheckbox = (props: CheckboxProps) => (
	<form>
		<div style={{ display: "flex", alignItems: "center" }}>
			<Checkbox.Root className={props.checked ? `${s.CheckboxRoot} ${s['checkbox-done']}` : s.CheckboxRoot} onCheckedChange={props.onChange} checked={props.checked}>
				<Checkbox.Indicator className={s.CheckboxIndicator}>
					<CheckIcon className={s.icon}/>
				</Checkbox.Indicator>
			</Checkbox.Root>
		</div>
	</form>
);

export default CircleCheckbox;