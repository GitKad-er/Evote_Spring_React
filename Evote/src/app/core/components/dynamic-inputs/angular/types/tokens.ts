import { InjectionToken } from '@angular/core';
import { FormsClient, SelectOptionsClient } from '../../core';
import { AngularReactiveFormBuilderBridge } from '.';
import { RequestClient } from '../../http';

export const FORM_CLIENT = new InjectionToken<FormsClient>(
  'FORM CLIENT FOR LOADING FORM THE DATA SOURCE'
);

export const ANGULAR_REACTIVE_FORM_BRIDGE =
  new InjectionToken<AngularReactiveFormBuilderBridge>(
    'PROVIDE AN INSTANCE THAT CREATE ANGULAR REACTIVE FORM ELEMENT FROM A FORM CONFIG'
  );

export const API_BINDINGS_ENDPOINT = new InjectionToken<string>(
  'API ENDPOINT FOR APPLICATION CONTROLS BINDINGS'
);

export const API_HOST = new InjectionToken<string>(
  'API HOST FOR FORM MANAGEMENT'
);

export const SELECT_CONTROL_OPTIONS_CLIENT =
  new InjectionToken<SelectOptionsClient>(
    'CLIENT PROVIDER FOR SELETION OPTIONS'
  );

export const HTTP_REQUEST_CLIENT = new InjectionToken<RequestClient>(
  'CLIENT INSTANCE FOR HANDLING FORM SUBMISSION'
);
