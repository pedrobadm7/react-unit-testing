import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from './components/List'

describe('List Component', () => {
  it('should render list items', async () => {
    const { getByText, rerender, unmount, queryByText } = render(<List initialItems={['Pedro', 'Lucas', 'Vini']}/>)

    expect(getByText('Pedro')).toBeInTheDocument()
    expect(getByText('Lucas')).toBeInTheDocument()
    expect(getByText('Vini')).toBeInTheDocument()

    unmount()
    rerender(<List initialItems={['Clarissa']}/>)

    expect(getByText('Clarissa')).toBeInTheDocument()
    expect(queryByText('Lucas')).not.toBeInTheDocument()
  });

  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<List initialItems={[]}/>)

    const inputElement = getByPlaceholderText('Novo item')
    const addButton = getByText('Adicionar');


    userEvent.type(inputElement, 'Dudu');
    userEvent.click(addButton); 

    await waitFor(() => {
      expect(getByText('Dudu')).toBeInTheDocument()
    })

    // expect(await findByText('Dudu')).toBeInTheDocument()
  });

  it('should be able to remove item to the list', async () => {
    const { getAllByText, queryByText} = render(<List initialItems={['Pedro', 'Lucas', 'Vini']}/>)

    const removeButtons = getAllByText('Remover')

    userEvent.click(removeButtons[0]); 

    // await waitForElementToBeRemoved(() => {
    //   return getByText('Pedro')
    // })

    await waitFor(() => {
      expect(queryByText('Pedro')).not.toBeInTheDocument()
    })

  });
})