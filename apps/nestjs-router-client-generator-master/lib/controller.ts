/**
 * @file Analyzer for the source API's controllers (singles)
 */

import * as path from 'path'
import { ClassDeclaration, Node, Project } from 'ts-morph'
import { debug, warn } from './logging'
import { analyzeMethods, SdkMethod } from './methods'

/**
 * Convert a string to camel case
 * @param str
 */
function camelcase(str: string): string {
    return str
        .split(/[^a-zA-Z0-9_]/g)
        .map((p, i) => {
            const f = p.substr(0, 1)
            return (i === 0 ? f.toLocaleLowerCase() : f.toLocaleUpperCase()) + p.substr(1)
        })
        .join('')
}

/**
 * Get controller decorator
 * @param classDecl
 */
function getControllerDecorator(classDecl: ClassDeclaration) {
    return classDecl.getDecorators().find((dec) => dec.getName() === 'Controller')
}

/**
 * SDK interface of a controller
 */
export interface SdkController {
    /** Original controller file's path */
    readonly path: string
    /** Name of the controller's class, camel cased */
    readonly camelClassName: string
    /** Name the controller is registered under */
    readonly className: string
    /** TODO */
    readonly controllerUriPrefix: string | null
    /** TODO */
    readonly classDeclaration: ClassDeclaration
}

/**
 * Generate a SDK interface for a controller
 * @param project TS-Morph project the controller is contained in
 * @param controllerPath Path to the controller's file
 * @param absoluteSrcPath Absolute path to the source directory
 * @returns The SDK interface of the provided controller
 */
export function analyzeController(project: Project, controllerPath: string): SdkController | null | Error {
    debug('Analyzing: {yellow}', controllerPath)

    const sourceFile = project.addSourceFileAtPath(controllerPath);

    // Ищем класс с декоратором @Controller
    const classDeclaration = sourceFile.getClasses().find(classDec => {
        return getControllerDecorator(classDec)
    });

    if (!classDeclaration) {
        warn('No controller found in this file.')
        return null
    }

    if (!Node.isClassDeclaration(classDeclaration))
        return new Error('Internal error: found class declaration statement which is not an instance of ClassDeclaration')

    const className = classDeclaration.getName()

    if (className === undefined) {
        return new Error('Internal error: failed to retrieve name of declared class')
    }

    debug('Found class declaration: {yellow}', className)

    let controllerUriPrefix: string | null = null

    // Get the @Controller() decorator
    const decorator = getControllerDecorator(classDeclaration)

    if (!decorator) {
        warn('Skipping this controller as it does not have a @Controller() decorator')
        return null
    }

    // Get the decorator's call expression
    const decCallExpr = decorator.getCallExpression()

    if (!decCallExpr) {
        warn('Skipping this controller as its @Controller() decorator is not called')
        return null
    }

    // Get the decorator's arguments
    const decExpr = decCallExpr.getArguments()

    if (decExpr.length > 1) {
        warn('Skipping this controller as its @Controller() decorator is called with more than 1 argument')
        return null
    }

    // Get the first argument, which is expected to be the controller's registration name
    // Example: `@Controller("SuperName")` will register the controller under the name "SuperName"
    if (decExpr[0]) {
        const nameArg = decExpr[0]

        // Variables are not supported
        if (!Node.isStringLiteral(nameArg)) {
            warn("Skipping this controller as its @Controller() decorator's argument is not a string literal")
            return null
        }


        controllerUriPrefix = nameArg.getLiteralText()
        debug('Registering controller {yellow}  (as specified in @Controller())', className)
    } else {
        // No argument was provided to the @Controller() decorator, so we stick with the original controller's name
        debug('@Controller() was called without argument, registering controller under name {yellow}', className)
    }

    // Success!
    debug(`└─ Done for controller {yellow}`, controllerPath)

    return {
        path: controllerPath,
        camelClassName: camelcase(className),
        className,
        controllerUriPrefix,
        classDeclaration
    }
}