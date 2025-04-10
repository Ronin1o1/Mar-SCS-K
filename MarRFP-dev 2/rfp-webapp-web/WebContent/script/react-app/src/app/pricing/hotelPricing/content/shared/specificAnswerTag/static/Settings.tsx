const Settings = {
    btQuestionList: {
        formFields: {
            btPricingOption: {
                id: "btPricingOption",
                keyField: "btPricingType",
                valField: "value",
            },
            customAnswerOption: {
                id: "customAnswerOption",
                keyField: "customAnswerType",
                valField: "value",
            },
        },
        btPricingOptions: [
            {
                btPricingType: "",
                value: "",
            },
            {
                btPricingType: "Y",
                value: "Yes",
            },
            {
                btPricingType: "N",
                value: "No",
            },
        ],
        customAnswerOptions: [
            {
                customAnswerType: "Y",
                value: "Y",
            },
            {
                customAnswerType: "N",
                value: "N",
            },
            {
                customAnswerType: "N/A",
                value: "N/A",
            },
        ],
    }
}
export default Settings;
