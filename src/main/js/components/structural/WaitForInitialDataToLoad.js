import React from 'react'

import todoLogic from '../../logic/todoLogic'
import usersLogic from '../../logic/profileLogic'
import {BrandedNavbar} from './PageTopNavbar'
import PageBody from './PageBody'
import BigMemba from '../BigMemba'

const LoadingScreen = () => <div>
        <BrandedNavbar/>
        <PageBody>
            <BigMemba/>
        </PageBody>
    </div>;

class WaitForInitialDataToLoad extends React.Component {
    state = {
        generation: 0,
    };

    render() {
        return todoLogic.areItemsNotLoaded() || usersLogic.areItemsNotLoaded() ? <LoadingScreen/> : this.props.children
    }
    componentDidMount() {
        todoLogic.subscribe(this, () => this.incGeneration())
        usersLogic.subscribe(this, () => this.incGeneration())
    }

    componentWillUnmount() {
        todoLogic.unsubscribe(this)
        usersLogic.unsubscribe(this)
    }

    incGeneration() {
        this.setState({generation: this.state.generation + 1})
    }
}

export default WaitForInitialDataToLoad