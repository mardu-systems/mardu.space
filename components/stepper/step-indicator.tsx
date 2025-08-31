"use client";

import clsx from "clsx";
import * as React from "react";

/**
 * Defines the properties for a Step Indicator component.
 * Represents a progress tracker with multiple steps.
 */
export type StepIndicatorProps = {
    /** 1-based: current step */
    current: number;
    /** If labels are set, the number of steps is derived from them. */
    labels?: string[];
    /** Alternative to labels length: explicit number of steps. */
    total?: number;
    /** Optional: Click on step allows direct navigation. Index is 1-based. */
    onStepClick?: (index: number) => void;
    /** Size of circles */
    size?: "sm" | "md" | "lg";
    className?: string;
    /** Show small subtitles under the numbers (from labels) */
    showLabels?: boolean;
    /** Show connecting progress line */
    showProgressLine?: boolean;
};

/**
 * A type representing the state of a step in a process or workflow.
 *
 * Possible values are:
 * - "active": Indicates that the step is currently active or in progress.
 * - "done": Indicates that the step has been completed.
 * - "pending": Indicates that the step is waiting to be executed or started.
 */
type StepState = "active" | "done" | "pending";

/**
 * Configuration object defining styles for different size variants.
 *
 * Each key represents a size variant (e.g., 'sm', 'md', 'lg') and maps to an object
 * containing styling properties for corresponding elements.
 *
 * Properties:
 * - `circle`: Defines width, height, and font size for circle elements.
 * - `gap`: Sets the spacing between elements.
 * - `label`: Specifies font size for label text.
 * - `padding`: Determines padding around elements.
 *
 * The object is immutable (`as const`) to ensure type safety.
 */
const SIZE_CONFIG = {
    sm: {circle: "w-7 h-7 text-xs", gap: "gap-2", label: "text-[11px]", padding: "p-1"},
    md: {circle: "w-9 h-9 text-sm", gap: "gap-3", label: "text-xs", padding: "p-1.5"},
    lg: {circle: "w-12 h-12 text-base", gap: "gap-4", label: "text-sm", padding: "p-2"},
} as const;

/**
 * An object representing the styles for different step states in a multi-step user interface.
 * The object contains predefined style class strings for "active", "done", and "pending" steps.
 *
 * @constant {Readonly<{active: string, done: string, pending: string}>} STEP_STYLES
 *
 * Properties:
 * - active: Styles applied to the current, active step. Typically includes emphasis on the step's appearance.
 * - done: Styles applied to steps that have been completed. Typically includes a subtle indicator of completion.
 * - pending: Styles applied to steps that are awaiting action or are not yet reached.
 */
const STEP_STYLES = {
    active: "bg-primary text-primary-foreground border-primary shadow-sm",
    done: "bg-primary/15 text-primary border-primary/40",
    pending: "bg-background text-muted-foreground border-border",
} as const;

/**
 * Determines the state of a step based on its index and the current step index.
 *
 * @param {number} stepIndex - The index of the step to evaluate.
 * @param {number} current - The index of the current step.
 * @return {StepState} The state of the step, which can be "active", "done", or "pending".
 */
function getStepState(stepIndex: number, current: number): StepState {
    if (stepIndex === current) return "active";
    if (stepIndex < current) return "done";
    return "pending";
}

/**
 * Generates an accessible ARIA label for a specific step in a process.
 *
 * @param {number} stepIndex - The current step index, representing the position in the sequence.
 * @param {number} total - The total number of steps in the sequence.
 * @param {string} [label] - An optional descriptive label to append to the generated ARIA label.
 * @return {string} The constructed ARIA label for the given step.
 */
function getAriaLabel(stepIndex: number, total: number, label?: string): string {
    const baseLabel = `Schritt ${stepIndex} von ${total}`;
    return label ? `${baseLabel}: ${label}` : baseLabel;
}

/**
 * This interface represents the properties for a StepCircle component.
 *
 * @interface StepCircleProps
 *
 * @property {number} stepIndex - The index of the current step in the sequence.
 * @property {StepState} state - The state of the step, indicating its current status (e.g., complete, active, or inactive).
 * @property {keyof typeof SIZE_CONFIG} size - The size of the step circle, defined as a key from the SIZE_CONFIG object.
 * @property {string} [label] - An optional label to display within or alongside the step circle.
 * @property {number} totalSteps - The total number of steps in the process.
 * @property {boolean} isClickable - A flag indicating whether the step circle is interactive and can be clicked.
 * @property {() => void} [onClick] - An optional callback function to handle the click event when the step is clicked.
 */
interface StepCircleProps {
    stepIndex: number;
    state: StepState;
    size: keyof typeof SIZE_CONFIG;
    label?: string;
    totalSteps: number;
    isClickable: boolean;
    onClick?: () => void;
}

/**
 * Renders a circular step indicator with optional interactivity.
 *
 * @param {Object} props The properties for the StepCircle component.
 * @param {number} props.stepIndex The current step index to be displayed inside the circle.
 * @param {"active"|"inactive"|"completed"} props.state The state of the step, determining its appearance.
 * @param {"small"|"medium"|"large"} props.size The size of the circle.
 * @param {string} props.label The label associated with the step for accessibility purposes.
 * @param {number} props.totalSteps The total number of steps in the process.
 * @param {boolean} props.isClickable Defines whether the step circle can be clicked.
 * @param {function} [props.onClick] The function to handle click events if the step is clickable.
 * @return {JSX.Element} The rendered step circle component.
 */
function StepCircle({stepIndex, state, size, label, totalSteps, isClickable, onClick}: StepCircleProps) {
    const config = SIZE_CONFIG[size];

    const circleElement = (
        <div
            className={clsx(
                "relative inline-flex items-center justify-center rounded-full border",
                config.circle,
                STEP_STYLES[state]
            )}
            aria-current={state === "active" ? "step" : undefined}
            aria-label={getAriaLabel(stepIndex, totalSteps, label)}
        >
            <span className="font-medium tabular-nums">{stepIndex}</span>
        </div>
    );

    if (isClickable) {
        return (
            <button
                type="button"
                className={clsx(
                    "group outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full",
                    config.padding
                )}
                onClick={onClick}
            >
                {circleElement}
            </button>
        );
    }

    return circleElement;
}

/**
 * Interface representing properties for a progress line component.
 *
 * @property isDone Indicates whether the progress line is complete.
 * @property size Specifies the size of the progress line, corresponding to keys in the SIZE_CONFIG object.
 */
interface ProgressLineProps {
    isDone: boolean;
    size: keyof typeof SIZE_CONFIG;
}

/**
 * Renders a progress line component that visually represents progress based on the `isDone` state and size configuration.
 *
 * @param {Object} props - The properties passed to the ProgressLine component.
 * @param {boolean} props.isDone - Determines if the progress is completed. If true, the progress line will be marked as done.
 * @param {string} props.size - Represents the size of the progress line. Affects the configuration applied to the component.
 * @return {JSX.Element} The rendered progress line element.
 */
function ProgressLine({isDone, size}: ProgressLineProps) {
    const config = SIZE_CONFIG[size];

    return (
        <li aria-hidden="true" className={clsx("flex-1 min-w-6", config.gap)}>
            <div className="relative h-0.5 w-full bg-border/70">
                <div
                    className={clsx(
                        "absolute inset-y-0 left-0 h-0.5 transition-all duration-300",
                        isDone ? "w-full bg-primary" : "w-0"
                    )}
                />
            </div>
        </li>
    );
}

/**
 * Represents the properties for the StepLabel component.
 *
 * The StepLabelProps interface defines the required structure
 * and types of the properties used by the StepLabel component.
 */
interface StepLabelProps {
    label: string;
    size: keyof typeof SIZE_CONFIG;
}

/**
 * Renders a step label with specific styles based on the given size configuration.
 *
 * @param {Object} props - The properties for the StepLabel component.
 * @param {string} props.label - The text to display as the step label.
 * @param {string} props.size - The size configuration key that determines styling.
 * @return {JSX.Element} A styled span element containing the step label text.
 */
function StepLabel({label, size}: StepLabelProps) {
    const config = SIZE_CONFIG[size];

    return (
        <span className={clsx("ml-2 text-muted-foreground", config.label)}>
            {label}
        </span>
    );
}

/**
 * Renders a StepIndicator component to visualize the progress of multi-step processes.
 *
 * @param {Object} params - The parameters for the StepIndicator component.
 * @param {number} params.current - The current step in the indicator (1-based index).
 * @param {string[]} [params.labels] - An optional array of labels for each step.
 * @param {number} [params.total] - The total number of steps if no `labels` are provided.
 * @param {Function} [params.onStepClick] - A callback function that gets called with the step index when a step is clicked.
 * @param {string} [params.size="md"] - The size of the step indicator, can be "sm", "md", or "lg".
 * @param {string} [params.className] - Additional class names to apply to the root element.
 * @param {boolean} [params.showLabels=true] - Whether to show labels for each step.
 * @param {boolean} [params.showProgressLine=true] - Whether to display progress lines connecting the steps.
 * @return {JSX.Element|null} The rendered StepIndicator component, or null if no steps are defined.
 */
export default function StepIndicator({
                                          current,
                                          labels,
                                          total,
                                          onStepClick,
                                          size = "md",
                                          className,
                                          showLabels = true,
                                          showProgressLine = true,
                                      }: StepIndicatorProps) {
    // Berechne Anzahl der Schritte und sichere aktuellen Schritt
    const stepCount = React.useMemo(() => labels?.length ?? total ?? 0, [labels, total]);
    const clampedCurrent = React.useMemo(
        () => Math.min(Math.max(current, 1), Math.max(stepCount, 1)),
        [current, stepCount]
    );

    const config = SIZE_CONFIG[size];

    if (stepCount === 0) {
        return null;
    }

    return (
        <nav aria-label="Fortschritt" className={clsx("w-full", className)}>
            <ol className={clsx("flex items-center", config.gap, "flex-wrap")}>
                {Array.from({length: stepCount}, (_, index) => {
                    const stepIndex = index + 1;
                    const state = getStepState(stepIndex, clampedCurrent);
                    const stepLabel = labels?.[index];
                    const isLastStep = stepIndex === stepCount;

                    return (
                        <React.Fragment key={stepIndex}>
                            <li className="flex items-center">
                                <StepCircle
                                    stepIndex={stepIndex}
                                    state={state}
                                    size={size}
                                    label={stepLabel}
                                    totalSteps={stepCount}
                                    isClickable={Boolean(onStepClick)}
                                    onClick={() => onStepClick?.(stepIndex)}
                                />

                                {showLabels && stepLabel && (
                                    <StepLabel label={stepLabel} size={size}/>
                                )}
                            </li>

                            {showProgressLine && !isLastStep && (
                                <ProgressLine isDone={state === "done"} size={size}/>
                            )}
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
}