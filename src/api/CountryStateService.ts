'use strict';

import localVarRequest = require("request");
import http = require("http");
import Promise = require("bluebird");

import { Authentication } from '../auth/Authentication';
import { VoidAuth } from '../auth/VoidAuth';
import { ObjectSerializer } from '../serializers/ObjectSerializer';

import { ClientError } from  '../models/ClientError';
import { RestCountryState } from  '../models/RestCountryState';
import { ServerError } from  '../models/ServerError';

class CountryStateService {
    protected _basePath = 'https://checkout.postfinance.ch:443/api';
    protected defaultHeaders : any = {};
    protected _useQuerystring : boolean = false;

    protected authentications = {
        'default': <Authentication>new VoidAuth({})
    }

    constructor(configuration: any) {
        this.setDefaultAuthentication(new VoidAuth(configuration))
    }

    set useQuerystring(value: boolean) {
        this._useQuerystring = value;
    }

    set basePath(basePath: string) {
        this._basePath = basePath;
    }

    get basePath() {
        return this._basePath;
    }

    protected setDefaultAuthentication(auth: Authentication) {
        this.authentications.default = auth;
    }

    /**
    * This operation returns all states of all countries.
    * @summary All
    * @param {*} [options] Override http request options.
    */
    public all (options: any = {}) : Promise<{ response: http.IncomingMessage; body: Array<RestCountryState>;  }> {
        const localVarPath = this.basePath + '/country-state/all';
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };

        this.authentications.default.applyToRequest(localVarRequestOptions);

        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                (<any>localVarRequestOptions).formData = localVarFormParams;
            } else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise<{ response: http.IncomingMessage; body: Array<RestCountryState>;  }>((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    if (response.statusCode){
                        if (response.statusCode >= 200 && response.statusCode <= 299) {
                            body = ObjectSerializer.deserialize(body, "Array<RestCountryState>");
                            resolve({ response: response, body: body });
                        } else {
                            let errorObject: ClientError | ServerError;
                            if (response.statusCode >= 400 && response.statusCode <= 499) {
                                errorObject = new ClientError();
                            } else if (response.statusCode >= 500 && response.statusCode <= 599){
                                errorObject = new ServerError();
                            } else {
                                errorObject = new Object();
                            }
                            reject({
                                errorType: errorObject.constructor.name,
                                date: (new Date()).toDateString(),
                                statusCode: <string> <any> response.statusCode,
                                statusMessage: response.statusMessage,
                                body: body,
                                response: response
                            });
                        }
                    }
                    reject({
                        errorType: "Unknown",
                        date: (new Date()).toDateString(),
                        statusCode: "Unknown",
                        statusMessage: "Unknown",
                        body: body,
                        response: response
                    });

                }
            });
        });
    }
    /**
    * This operation returns all states for a given country.
    * @summary Find by Country
    * @param code The country code in ISO code two letter format for which all states should be returned.
    * @param {*} [options] Override http request options.
    */
    public country (code: string, options: any = {}) : Promise<{ response: http.IncomingMessage; body: Array<RestCountryState>;  }> {
        const localVarPath = this.basePath + '/country-state/country';
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};

            // verify required parameter 'code' is not null or undefined
            if (code === null || code === undefined) {
                throw new Error('Required parameter code was null or undefined when calling country.');
            }

        if (code !== undefined) {
            localVarQueryParameters['code'] = ObjectSerializer.serialize(code, "string");
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };

        this.authentications.default.applyToRequest(localVarRequestOptions);

        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                (<any>localVarRequestOptions).formData = localVarFormParams;
            } else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise<{ response: http.IncomingMessage; body: Array<RestCountryState>;  }>((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    if (response.statusCode){
                        if (response.statusCode >= 200 && response.statusCode <= 299) {
                            body = ObjectSerializer.deserialize(body, "Array<RestCountryState>");
                            resolve({ response: response, body: body });
                        } else {
                            let errorObject: ClientError | ServerError;
                            if (response.statusCode >= 400 && response.statusCode <= 499) {
                                errorObject = new ClientError();
                            } else if (response.statusCode >= 500 && response.statusCode <= 599){
                                errorObject = new ServerError();
                            } else {
                                errorObject = new Object();
                            }
                            reject({
                                errorType: errorObject.constructor.name,
                                date: (new Date()).toDateString(),
                                statusCode: <string> <any> response.statusCode,
                                statusMessage: response.statusMessage,
                                body: body,
                                response: response
                            });
                        }
                    }
                    reject({
                        errorType: "Unknown",
                        date: (new Date()).toDateString(),
                        statusCode: "Unknown",
                        statusMessage: "Unknown",
                        body: body,
                        response: response
                    });

                }
            });
        });
    }
}

export { CountryStateService }