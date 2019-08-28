// Компонент List - список
// Напишите для него тесты.
// Компонент позволяет добавлять элементы в список.
// При добавлении нового элемента тексовое поле очищается.

// При клике на элементы списка они удаляются.

// Убедитесь, что вы протестировали всю функциональнось.

import React from 'react';
import renderer from "react-test-renderer";
import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
    it('renders without crashing', () => {
        const wrapper = render(<List />);
        expect(wrapper.getByTestId('list').textContent).toEqual('');
    });

    it('adds item in list', () => {
        const wrapper = render(<List />);

        fireEvent.change(wrapper.queryByTestId('input'), {
            target: { value: 'Помыть кота' }
        })
        fireEvent.click(wrapper.queryByTestId('button'));
        
        expect(wrapper.queryByText('Помыть кота')).toBeTruthy();
        expect(wrapper.queryByTestId('list').children.length).toBe(1);
    });

    it('adds multiple items in list', () => {
        const wrapper = render(<List />);

        fireEvent.change(wrapper.queryByTestId('input'), {
            target: { value: 'Узнать, как помыть кота' }
        })
        fireEvent.click(wrapper.queryByTestId('button'));

        fireEvent.change(wrapper.queryByTestId('input'), {
            target: { value: 'Помыть кота' }
        })
        fireEvent.click(wrapper.queryByTestId('button'));
        
        expect(wrapper.queryByText('Узнать, как помыть кота')).toBeTruthy();
        expect(wrapper.queryByText('Помыть кота')).toBeTruthy();
        expect(wrapper.queryByTestId('list').children.length).toBe(2);
    });

    it("doesn't add empty item in list", () => {
        const wrapper = render(<List />);

        fireEvent.change(wrapper.queryByTestId('input'), {
            target: { value: '' }
        })
        fireEvent.click(wrapper.queryByTestId('button'));
        
        expect(wrapper.queryByTestId('list').children.length).toBe(0);
    });

    it("doesn't add existing item in list", () => {
        const wrapper = render(<List />);

        fireEvent.change(wrapper.queryByTestId('input'), {
            target: { value: 'Помыть кота' }
        })
        fireEvent.click(wrapper.queryByTestId('button'));

        fireEvent.change(wrapper.queryByTestId('input'), {
            target: { value: 'Помыть кота' }
        })
        fireEvent.click(wrapper.queryByTestId('button'));
        
        expect(wrapper.queryByTestId('list').children.length).toBe(1);
    });

    it('cleares state after item adding', () => {
        const wrapper = render(<List />);

        fireEvent.change(wrapper.queryByTestId('input'), {
            target: { value: 'Помыть кота' }
        })
        fireEvent.click(wrapper.queryByTestId('button'));

        expect(wrapper.queryByTestId('input').value).toBe('');
    });

    it('deletes list item on click', () => {
        const wrapper = render(<List />);

        fireEvent.change(wrapper.queryByTestId('input'), {
            target: { value: 'Помыть кота' }
        })
        fireEvent.click(wrapper.queryByTestId('button'));
        fireEvent.click(wrapper.queryByText('Помыть кота'));

        expect(wrapper.queryByText('Помыть кота')).toBeFalsy();
    });

    it('satisfies snapshot', () => {
        expect(renderer.create(<List />)).toMatchSnapshot();
    });
});