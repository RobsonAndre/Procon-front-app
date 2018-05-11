import { Formcpf } from "@angular/forms";
import { FormGroup } from "@angular/forms";

export class CpfValidator {

    static isValid(cpf: Formcpf): any {
        let numeros, digitos, soma, i, resultado, digitos_iguais;
        digitos_iguais = 1;
        if (cpf.value.length < 11)            
            return(formGroup: FormGroup) => {
                formGroup.controls[cpf].setErrors({ cpf: { valid: false } })
            }
        for (i = 0; i < cpf.value.length - 1; i++)
            if (cpf.value.charAt(i) != cpf.value.charAt(i + 1)) {
                digitos_iguais = 0;
                break;
            }
        if (!digitos_iguais) {
            numeros = cpf.value.substring(0, 9);
            digitos = cpf.value.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return false
            numeros = cpf.value.substring(0, 10);
            soma = 0;
            for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return false
            return true;
        }
        else
            return null
    }
}