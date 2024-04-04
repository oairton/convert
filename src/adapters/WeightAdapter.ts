import { Weight } from "../models/Weight";

export class WeightAdapter {
    weight: Weight = {
        value: 0,
        unit: "cm"
    }

    conversionData: { [key: string]: { [key: string]: number } } = {
        "g": {
            "g": 1,
            "kg": 0.001,
            "t": 1e-6,
            "oz": 0.035274,
            "lb": 0.00220462
        },
        "kg": {
            "g": 1000,
            "kg": 1,
            "t": 0.001,
            "oz": 35.274,
            "lb": 2.20462
        },
        "t": {
            "g": 1e+6,
            "kg": 1000,
            "t": 1,
            "oz": 35274,
            "lb": 2204.62
        },
        "oz": {
            "g": 28.3495,
            "kg": 0.0283495,
            "t": 2.83495e-5,
            "oz": 1,
            "lb": 0.0625
        },
        "lb": {
            "g": 453.592,
            "kg": 0.453592,
            "t": 0.000453592,
            "oz": 453.592,
            "lb": 1
        }
    };
    

    convert(newUnit: string) {
        if (!this.conversionData[newUnit]) {
            throw new Error("Unidade de saída não suportada");
        }

        if (!this.conversionData[this.weight.unit][newUnit]) {
            throw new Error("Conversão de " + this.weight.unit + " para " + newUnit + " não suportada");
        }

        this.weight.value = this.weight.value * this.conversionData[this.weight.unit][newUnit]

        this.weight.unit = newUnit
    }

    update(newValue: number) {
        this.weight.value = newValue
    }

    create(value: number, unit: string) {
        if (!this.conversionData[unit]) {
            throw new Error("Unidade de medida '" + unit + "' não suportada");
        }
        this.weight.value = value
        this.weight.unit = unit
    }

    getOptions() {
        const weightAdapter = new WeightAdapter();
        const supportedUnits = Object.keys(weightAdapter.conversionData);
    
        return supportedUnits
    }

    see() {
        let result = ""
        result += this.weight.value + " "
        result += this.weight.unit
        return result
    }
}