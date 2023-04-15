import { Radio } from "@mantine/core";
import Label from "../Label";
import { useContext } from "react";
import { FormContext } from "../Form";

export default function DiabetesField(props: any) {
  const { form, disable } = useContext(FormContext);

	const onChangeNo = () => {
		props.parentCallbackNo();
	};
	const onChangeYes = () => {
		props.parentCallbackYes();
	};

	return (
		<div
			className="horizontal diabetes"
			style={{
        opacity: disable ? "0.5" : "1",
			}}
		>
			<Label
				labelName="Diabetes"
				labelRequired="*"
				// cardDropdownContent="Type 2 diabetes is independently associated with a twofold increased risk of developing CVD. The risk equation is not validated for type 1 diabetes. Using the Aus CVD risk calculator in people with type 1 diabetes is likely to underestimate risk."
				cardDropdownContent={
					form.getInputProps("age").error
						? ""
            : "Type 2 diabetes is independently associated with a twofold increased risk of developing CVD. The risk equation is not validated for type 1 diabetes. Using the Aus CVD risk calculator in people with type 1 diabetes may give an inaccurate risk score."
				}
				cardButtonLink=""
			></Label>
			<div className="horizontal-right">
				<Radio.Group
					name="Diabetes"
					description=""
					withAsterisk
					size="md"
					{...form.getInputProps("diabetes")}
				>
          <Radio value="0" label="No" onClick={onChangeNo} disabled={disable} />
					<Radio
						value="1"
						label="Yes"
						onClick={onChangeYes}
            disabled={disable}
					/>
				</Radio.Group>
			</div>
		</div>
	);
}
