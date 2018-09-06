import React from 'react'

import {TitleWithBackNavbar} from '../structural/PageTopNavbar'
import PageBody from '../structural/PageBody'
import ListIsEmpty from "../ListIsEmpty";
import todoLogic from "../../logic/todoLogic"
import {TodoListItemWithCheckbox} from './TodoListPage'
import AnimatedList from "../AnimatedList";

class DeadlinesPage extends React.Component {

    state = {
        generation: 0
    }

    render() {
        const todos = todoLogic.listTodosWithDeadlines();

        return <div>
            <TitleWithBackNavbar title="Deadlines"/>

            <PageBody>
                {
                    todos.length === 0 ? <ListIsEmpty text="No items with deadlines found"/> :
                        <AnimatedList>
                            {todos.map(t => <TodoListItemWithCheckbox renderPath={true} key={t.id} todo={t} backTo="/deadlines"/>)}
                        </AnimatedList>
                }
            </PageBody>
        </div>
    }

    componentDidMount() {
        todoLogic.subscribe(this, () => {this.setState({generation: this.state.generation + 1})});
    }

    componentWillUnmount() {
        todoLogic.unsubscribe(this)
    }


}


export default DeadlinesPage

