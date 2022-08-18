import { ArrayUtils, JSObject } from '../../../../utils';
import { ControlInterface, FormInterface } from '../compact/types';
import { IDynamicForm, InputInterface } from '../types';
import { buildControl } from './input-types';

export class DynamicFormHelpers {
  /**
   * @description Create an instance of IDynamic interface
   *
   * @param form
   */
  static buildFormSync(form: FormInterface) {
    console.log(form);
    const generatorFn = function (instance: FormInterface) {
      const hasControls =
        Array.isArray(instance?.controls) && instance?.controls?.length !== 0;
      return createform({
        id: instance.id,
        title: instance.title,
        description: instance.description,
        endpointURL: instance.url,
        controlConfigs: hasControls
          ? (ArrayUtils.sort(
              instance.controls
                ?.map((control) => {
                  const config = buildControl(control);
                  // tslint:disable-next-line: max-line-length
                  return { ...config } as InputInterface;
                })
                .filter((value) => value ?? false),
              'formControlIndex',
              1
            ) as InputInterface[])
          : [],
      });
    };
    return generatorFn(form);
  }
}

// # Forms Creators

/**
 * @description Creates a deep copy of the dynamic form object
 * @param form
 */
export const cloneform = (form: IDynamicForm) =>
  JSObject.cloneDeep(form) as IDynamicForm;

/**
 * @description Helper method for creating a new dynmaic form
 * @param form Object with the shape of the IDynamicForm interface
 */
export const createform = (form: IDynamicForm) => ({ ...form } as IDynamicForm);

/**
 * Create a new dynamic form from a copy of the user provided parameter
 *
 * @param form
 * @returns
 */
export const copyform = (form: IDynamicForm) =>
  createform(JSObject.cloneDeep(form));

// #Forms Soring function

/**
 * @description Sort form loaded from backend server by control index
 */
export const sortRawFormControls = (value: FormInterface) => {
  return {
    ...value,
    controls: sortControlsBy(value.controls ?? [], 'controlIndex', 1),
  } as FormInterface;
};
export function groupControlsBy(
  controls: ControlInterface[],
  property: keyof ControlInterface
) {
  return controls.reduce((carry, current) => {
    const key = (current[property] ?? 'root') as string;
    if (!carry[key]) {
      carry[key] = [];
    }
    carry[key].push(current);
    return carry;
  }, {} as { [index: string]: any });
}

export function setControlChildren(value: FormInterface) {
  return function (
    groupBy: (
      values: ControlInterface[],
      property: keyof ControlInterface
    ) => { [index: string]: ControlInterface[] }
  ) {
    const controls = groupBy(value.controls, 'controlGroupKey');
    const values = sortControlsBy(controls['root'] ?? [], 'controlIndex').map(
      (current) => {
        return {
          ...current,
          children: sortControlsBy(
            Array.from(
              new Set([...current.children, ...(controls[current['id']] ?? [])])
            ),
            'controlIndex'
          ),
        };
      }
    );
    return { ...value, controls: values };
  };
}

export function sortControlsBy(
  controls: ControlInterface[],
  property: keyof ControlInterface,
  order = 1
) {
  return ArrayUtils.sort(controls, property, order);
}