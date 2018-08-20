import React from 'react'
import PropTypes from 'prop-types'

import {TitleWithBackNavbar} from '../structural/PageTopNavbar'
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
        createMode: PropTypes.bool.isRequired,
        toolbarButtons: PropTypes.element
    };

    static defaultProps = {
        title: "Enter details",
        toolbarButtons: <span/>
    };

    state = {...this.props.item};

    render() {
        return <AbstractItemFormPageView
            FormComponent={this.props.formComponent}
            title={this.props.title}
            buttonClass={this.isSubmitEnabled() ? "btn-success" : "btn-primary"}
            buttonContents={this.isSubmitEnabled() ? <span>
                                <ButtonIcon className={"fas fa-check"}/>
                                {this.getSaveButtonLabel()}
                            </span>
                            : "Enter description first"}
            item={this.getItem()}
            onChangeFields={values => {this.setState(values)}}
            submitEnabled={this.isSubmitEnabled()}
            onSubmit={() => {this.onSubmit()}}
            createMode={this.props.createMode}
            toolbarButtons={this.props.toolbarButtons}
        />;
    }

    getSaveButtonLabel() {
        return this.props.saveButtonLabel || (this.props.createMode ? "Add new item" : "Save changes")
    }

    isSubmitEnabled() {
        return this.state.text.trim() !== "";
    }

    getItem() {
        return {...this.state}
    }

    onSubmit() {
        this.props.onSave(this.getItem());
    }
}

export default AbstractItemFormPage

const AbstractItemFormPageView = ({
                             FormComponent,
                             title, buttonClass, buttonContents,
                             item, onChangeFields,
                             submitEnabled, onSubmit,
                             toolbarButtons,
                             createMode
                         }) => <div>
    <TitleWithBackNavbar to="/" query={{groupId: item.groupId}} title={title}>
        {toolbarButtons}
    </TitleWithBackNavbar>

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
