import React from 'react'

import {withRouterWithQuery} from './routerUtils'

const _modals = [];

export function pushModal(modal) {
    _modals.push(modal)
}


export function popModal() {
    _modals.pop()
}

export function onBackPressed() {
    const modal = _topModal();
    if (modal != null && modal.isShown()) {
        modal.hide();
        return false;
    } else {
        return true;
    }
}

function _topModal() {
    if (_modals.length === 0) {
        return null;
    } else {
        return _modals[_modals.length - 1];
    }
}

export const modalClosingConfirmation = (message, callback) => {
    callback(onBackPressed());
};

class _HistoryBlocker extends React.Component {
    componentDidMount() {
        this.unblock = this.props.history.block("modal displayed");
    }

    componentWillUnmount() {
        this.unblock();
    }

    render() {
        return this.props.children
    }
}

export const HistoryBlocker = withRouterWithQuery(_HistoryBlocker);
