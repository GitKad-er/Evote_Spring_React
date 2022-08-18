import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'etat'
})
export class EtatPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'EN COURS';
      case 2:
        return 'EN COURS';
      case 3:
          return 'EN COURS';
      default:
        // return value;
        throw new Error('Undefined case');
    }

    ///
  }
}


@Pipe({
  name: 'sstock'
})
export class stateSock implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'NON VALIDER';
      case 2:
        return 'VALIDER';
      default:
        // return value;
        throw new Error('Undefined case');
    }
  }
}

@Pipe({
  name: 'ttock'
})
export class typeSock implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'ENTRER';
      case 2:
        return 'SORTIE';
      default:
        // return value;
        throw new Error('Undefined case');
    }
  }
}
