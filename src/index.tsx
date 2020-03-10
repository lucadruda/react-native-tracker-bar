import React, { ReactElement } from 'react';
import { View, Text, StyleSheet, ViewStyle } from "react-native";

interface IStepProps {
    percentage: number
}
interface IInnerStepProps extends IStepProps {
    index: number,
    last?: boolean,
    unit: number
}

// TODO type
export const ProgressTracker = (props: { style?: ViewStyle, size?: number, children: ReactElement<IStepProps> | ReactElement<IStepProps>[] }) => {
    const { size, children } = props;
    const count = React.Children.count(children);
    const barSize = size ? size : 320;
    const unit = (barSize - 60) / 10;
    let total = 0;
    return (
        <View style={props.style}>
            <View style={{ ...style.bar, ...style.round, ...{ width: barSize } }}>
                {React.Children.map(children, (s, i) => {
                    total += s.props.percentage;
                    let currentProps = s.props as IStepProps;
                    if (count >= 1 && (i == count - 1) && total == 100) {
                        return <InnerStep {...currentProps} index={i} last={true} unit={unit} key={i} />
                    }
                    else {
                        return <InnerStep {...currentProps} index={i} unit={unit} key={i} />
                    }
                })}
            </View>
        </View>)
}

export const Step: React.FC<IStepProps> = (props: IStepProps) => {
    return (null);
}

const InnerStep: React.FC<IInnerStepProps> = (props: IInnerStepProps) => {
    // main component width. subtract start and end triangle
    const { last, unit, index, percentage } = props;
    const quantity = percentage / 10;
    const separator = 3;
    const first = index == 0 && !last;
    const only = first && last;

    const ColorCode = '#915040';
    const width = (quantity * unit);
    const elemWidth = (width - unit) + (unit / 2);

    if (only) {
        return (
            <View style={{ flexDirection: 'row', width }}>
                <View style={{ ...style.first, ...{ borderStartColor: ColorCode, borderTopColor: ColorCode } }} />
                <View style={{ ...style.elem, ...{ width: elemWidth - (unit / 2), backgroundColor: ColorCode } }} />
                <View style={{ ...style.end, ...{ borderTopColor: ColorCode } }} />
                <View style={{ ...style.start, ...{ borderBottomColor: ColorCode, marginStart: -unit } }} />
                <View style={{ ...style.last, ...{ borderEndColor: ColorCode, borderBottomColor: ColorCode } }} />
            </View>)
    }
    else if (first) {
        const marginEnd = unit + (unit / 2);
        return (
            <View style={{ flexDirection: 'row', width, marginEnd: marginEnd }}>
                <View style={{ ...style.first, ...{ borderStartColor: ColorCode, borderTopColor: ColorCode } }} />
                <View style={{ ...style.elem, ...{ width: elemWidth, backgroundColor: ColorCode } }} />
                <View style={{ ...style.end, ...{ borderTopColor: ColorCode } }} />
            </View>)
    }
    else if (last && !only) {
        return (
            <View style={{ flexDirection: 'row', width, marginStart: -unit + (separator * 2) }}>
                <View style={{ ...style.start, ...{ borderBottomColor: ColorCode } }} />
                <View style={{ ...style.elem, ...{ width: elemWidth, backgroundColor: ColorCode } }} />
                <View style={{ ...style.last, ...{ borderEndColor: ColorCode, borderBottomColor: ColorCode } }} />
            </View>)
    }
    else {
        const width = (quantity * unit) - unit;
        return (
            <View style={{ flexDirection: 'row', marginStart: -unit + (separator * 2) }}>
                <View style={{ ...style.start, ...{ borderBottomColor: ColorCode } }} />
                <View style={{ ...style.elem, ...{ width: width, backgroundColor: ColorCode } }} />
                <View style={{ ...style.end, ...{ borderTopColor: ColorCode } }} />
            </View >
        )
    }
}

const style = StyleSheet.create({
    round: {
        borderRadius: 30,
        borderWidth: 1
    },
    bar: {
        height: 60,
        borderColor: 'gray',
        flexDirection: 'row',
        backgroundColor: 'gray'
    },
    elem: {
        height: 58,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        justifyContent: 'center'

    },
    first: {
        borderTopStartRadius: 30,
        borderBottomStartRadius: 30,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderStartWidth: 30,
        borderTopWidth: 30
    },
    last: {
        borderTopEndRadius: 30,
        borderBottomEndRadius: 30,
        borderBottomWidth: 30,
        borderRightWidth: 32,
        backgroundColor: 'transparent',
        borderStyle: 'solid'
    },
    start: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftColor: 'transparent',
        borderBottomWidth: 58,
        borderLeftWidth: 23
    },
    end: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 58,
        borderRightColor: 'transparent',
        borderRightWidth: 23
    }
})