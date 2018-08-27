import React from 'react'
import PropTypes from 'prop-types'

import {IconAndTitle, PageTopNavbar} from '../structural/PageTopNavbar'
import PageBody from '../structural/PageBody'
import {BottomButtonBar} from '../structural/PageBottomBar'

import ButtonIcon from '../ButtonIcon'

class AbstractItemFormPage extends React.Component {

    static propTypes = {
        formComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
        item: PropTypes.object.isRequired,
        title: PropTypes.string,
        saveButtonLabel: PropTypes.string,
        onSave: PropTypes.func.isRequired,
        onBack: PropTypes.func.isRequired,
        createMode: PropTypes.bool.isRequired,
        toolbarButtons: PropTypes.element
    };

    static defaultProps = {
        title: "Enter details",
        toolbarButtons: <span/>
    };

    state = {
        item: this.props.item,
        modified: false
    };

    render() {
        return <div>
            <AbstractItemFormPageView
                        FormComponent={this.props.formComponent}
                        title={this.props.title}
                        buttonClass={this.isSaveEnabled() ? "btn-success" : "btn-primary"}
                        buttonContents={this.isSaveEnabled() ? <span>
                                            <ButtonIcon className={"fas fa-check"}/>
                                            {this.getSaveButtonLabel()}
                                        </span>
                                        : "Enter description first"}
                        item={this.getItem()}
                        onChangeFields={fields => {this.onChangeFields(fields)}}
                        submitEnabled={this.isSaveEnabled()}
                        onSubmit={() => {this.onSubmit()}}
                        onBack={() => {this.onBack()}}
                        createMode={this.props.createMode}
                        toolbarButtons={this.props.toolbarButtons}
                    />
        </div>;
    }

    getSaveButtonLabel() {
        return this.props.saveButtonLabel || (this.props.createMode ? "Add new item" : "Save changes")
    }


    isSaveEnabled() {
        return this.state.item.text.trim() !== "";
    }

    getItem() {
        return this.state.item
    }

    onBack() {
        if (this.isSaveEnabled() && this.state.modified) {
            this.onSubmit();
        } else {
            this.props.onBack();
        }

    }


    onChangeFields(values) {
        const newItem ={...this.state.item, ...values};
        this.setState({item: newItem, modified: true})
    }

    onSubmit() {
        this.props.onSave(this.getItem());
    }

    componentDidMount() {
        $(window).scrollTop(0);
    }
}

export default AbstractItemFormPage

const AbstractItemFormPageView = ({
                             FormComponent,
                             title, buttonClass, buttonContents,
                             item, onChangeFields,
                             submitEnabled, onSubmit,
                             toolbarButtons,
                             createMode, onBack
                         }) => <div>
    <PageTopNavbar>
        <IconAndTitle title={title} onClick={onBack} iconClass={"fas fa-backward"}/>
        {toolbarButtons}
    </PageTopNavbar>

    <PageBody>
        <div className="container" style={{padding: 2}}>
             <FormComponent item={item} onChangeFields={onChangeFields} createMode={createMode}/>
        </div>
    </PageBody>

    <BottomButtonBar>
        <button
            className={"btn btn-lg btn-block " + buttonClass}
            disabled={!submitEnabled}
            onClick={submitEnabled ? onSubmit : () => {}}
        >
            {buttonContents}
        </button>
    </BottomButtonBar>
</div>;
