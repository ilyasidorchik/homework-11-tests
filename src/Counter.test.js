// Компонент Counter - простой счётчик
// Напишите для него тесты.
// Убедитесь, что вы протестировали всю функциональнось.
// Также проверьте что компонент рендерится верно, используя Snapshot тест.

// * Задание со звёздочкой - выполнять не обязательно

// Вынесите логику в хук и протестируйте его

import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import { Counter, useCounter } from './Counter';


describe('Counter', () => {
    it('renders without crashing', () => {
        const wrapper = render(<Counter />);
        expect(wrapper.getByTestId('counter').textContent).toEqual('0');
    });

    it('initial counter value equals 0', () => {
        const wrapper = render(<Counter />);
        expect(wrapper.getByTestId('counter').textContent).toEqual('0');
    });

    it('counter value can be negative', () => {
        const wrapper = render(<Counter />);
        wrapper.getByTestId('btn-decrement').click();
        expect(wrapper.getByTestId('counter').textContent).toEqual('-1');
    });

    it('counter value increases', () => {
        const wrapper = render(<Counter />);
        wrapper.getByTestId('btn-increment').click();
        expect(wrapper.getByTestId('counter').textContent).toEqual('1');
        wrapper.getByTestId('btn-increment').click();
        expect(wrapper.getByTestId('counter').textContent).toEqual('2');
    });

    it('counter value decreases', () => {
        const wrapper = render(<Counter />);
        wrapper.getByTestId('btn-decrement').click();
        expect(wrapper.getByTestId('counter').textContent).toEqual('-1');
        wrapper.getByTestId('btn-decrement').click();
        expect(wrapper.getByTestId('counter').textContent).toEqual('-2');
    });

    it('satisfies snapshot', () => {
        expect(renderer.create(<Counter />)).toMatchSnapshot();
    });
});

describe('custom hook useCounter', () => {
    it('counter starts with specified value', () => {
        const { result } = renderHook(() => useCounter(1147));
        expect(result.current.count).toEqual(1147);
    });

    it('increment increases counter value by one', () => {
        const { result } = renderHook(() => useCounter(0));

        act(() => {
            result.current.increment();
        });

        expect(result.current.count).toEqual(1);
    });

    it('decrement decreases counter value by one', () => {
        const { result } = renderHook(() => useCounter(0));

        act(() => {
            result.current.decrement();
        });

        expect(result.current.count).toEqual(-1);
    });
});