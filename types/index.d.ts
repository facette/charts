/**
 * Copyright (c) 2020, Vincent Batoufflet
 *
 * Licensed under the terms of the BSD 3-Clause License; a copy of the license
 * is available at: https://opensource.org/licenses/BSD-3-Clause
 */

import {CurveFactory} from "d3-shape";

export class Chart {
    public canvas: HTMLCanvasElement;
    public components: Record<string, Component>;
    public config: Config;
    public ctx: CanvasRenderingContext2D;
    public data: Data;
    public height: number;
    public width: number;
    public constructor(config: Config);
    public destroy(): void;
    public draw(): void;
    public update(config: Config): void;
}

export default Chart;

export type Component = {
    [key in Hook]?: () => void;
};

export interface OptionalComponent {
    enabled?: (config: Config) => boolean;
}

export type Hook = "init" | "beforeDraw" | "draw" | "afterDraw" | "destroy";

export type Constructor<T = unknown> = new (...args: Array<unknown>) => T;

export type Data = Array<Array<DataPoint>>;

export interface DataPoint {
    x: number;
    y0: number | null;
    y1: number | null;
}

export interface Config {
    area?: AreaConfig;
    axes?: {
        x?: XAxis;
        y?: {
            center?: boolean;
            left?: YAxis;
            right?: YAxis;
            stack?: StackMode;
        };
    };
    background?: {
        color?: string;
    };
    bindTo: HTMLElement;
    colors?: Array<string>;
    cursor?: {
        color?: string;
        enabled?: boolean;
    };
    events?: {
        afterDraw?: () => void;
        cursor?: (date: Date | null) => void;
        select?: (from: Date, to: Date) => void;
    };
    font?: {
        color?: string;
        family?: string;
        size?: number;
    };
    legend?: {
        enabled?: boolean;
    };
    margin?: number;
    markers?: Array<Marker>;
    selection?: {
        color?: string;
        enabled?: boolean;
    };
    series: Array<Series>;
    title?: {
        margin?: number;
        text?: string;
    };
    tooltip?: {
        date?: {
            format?: Formatter<Date>;
        };
        enabled?: boolean;
    };
    type?: ChartType;
}

export interface AreaConfig {
    curve?: CurveFactory;
    fill?: "gradient" | boolean;
    lineWidth?: number;
}

export interface Axis {
    draw?: boolean;
    max?: number;
    min?: number;
}

export interface XAxis extends Axis {
    grid?: boolean;
    ticks?: Ticks<Formatter<Date>>;
}

export interface YAxis extends Axis {
    grid?: boolean;
    label?: {
        margin?: number;
        text?: string;
    };
    ticks?: Ticks<Formatter<number | null>>;
}

export type Formatter<T> = (value: T) => string;

export interface Ticks<T> {
    count?: number;
    draw?: boolean;
    format?: T;
    margin?: number;
    size?: number;
}

export type StackMode = "normal" | "percent" | false;

export interface Marker {
    axis?: "left" | "right";
    color?: string;
    dashed?: boolean;
    label?: boolean | string;
    value: number;
}

export interface Series {
    area?: AreaConfig;
    axis?: "left" | "right";
    color?: string;
    disabled?: boolean;
    label?: string;
    points: Array<Point>;
    type?: ChartType;
}

export interface Point {
    0: number;
    1: number | null;
}

export type ChartType = "area" | "bar" | "line";
