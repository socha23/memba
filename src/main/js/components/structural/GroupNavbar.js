import React from 'react'
import PropTypes from 'prop-types'

import {encodeQuery, withRouterWithQuery} from "../../routerUtils";
import sharingLogic from '../../logic/sharingLogic'

import {ToolbarButton, BrandedNavbar} from './PageTopNavbar'
import GroupBackground from '../GroupBackground'

const Z_TOOLBAR_BUTTONS = 6;
const Z_BLOCK_TITLE_CONTENT = 5;
const Z_BLOCK_TITLE = 4;
const Z_SMALL_TOOLBAR = 3;

const BLOCK_TITLE_HEIGHT = 140;
const SMALL_TITLE_HEIGHT = 50;

export const RootNavbar = ({children}) => <div>
    <BrandedNavbar>
        {children}
    </BrandedNavbar>
</div>;

export class SizeChangingNavbar extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        group: PropTypes.object.isRequired,
        onBack: PropTypes.func,
    };

    render() {
        return <div id="navbar" style={{
            position: "relative",
            overflow: "hidden",
            textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)"
        }}>
            <SmallToolbar color={this.props.group.color} background={this.props.group.background}/>
            <NavButtons title={this.props.title || this.props.group.text} group={this.props.group} onBack={this.props.onBack}>
                {this.props.children}
            </NavButtons>
            <BlockTitle group={this.props.group}/>
        </div>

    };

    componentDidMount() {
        $(window).scroll(() => {
            const blockTitleElem = $("#blockTitle");
            const bigTitleElem = $(".bigTitle");
            const smallTitleElem = $(".smallTitle");

            const pos = $(window).scrollTop();
            if (pos > blockTitleElem.height() - SMALL_TITLE_HEIGHT) {
                blockTitleElem.css("opacity", 0);
                bigTitleElem.animate({"opacity": 0}, {duration: 100, queue: false});
                smallTitleElem.fadeIn();
            } else {
                blockTitleElem.css("opacity", 1);
                bigTitleElem.animate({"opacity": 1}, {duration: 100, queue: false});
                smallTitleElem.fadeOut();
            }
        });
    }
}

const BlockTitle = ({group}) => {
    const shareInfo = sharingLogic.getUsersItemIsSharedWith(group).length === 0 ?
        <span/> : <div className="bigTitle" style={{
            maxWidth: 300,
            position: "absolute",
            bottom: 2,
            left: 4,
            fontSize: 14,
            textShadow: "none"
        }}>with: {sharingLogic.getUsersItemIsSharedWithDescFull(group)}</div>;


    return <div id="blockTitle" style={{
        backgroundColor: group.color,
        position: "relative",
        zIndex: Z_BLOCK_TITLE,
        marginBottom: 1
    }}>
        <GroupBackground value={group.background}/>
        <div className="container"  style={{
            position: 'relative',
            minHeight: BLOCK_TITLE_HEIGHT,
            zIndex: Z_BLOCK_TITLE_CONTENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 30,
            paddingBottom: 20,
            color: "white",
            fontSize: 36,
        }}>
            <span style={{textAlign: "center",}} className={"bigTitle"}>{group.text}</span>
            {shareInfo}
        </div>
    </div>;
};

const SmallToolbar = ({color, background, children, className=""}) => <div className={className} style={{
    zIndex: Z_SMALL_TOOLBAR,
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    padding: 0,
    backgroundColor: color,
    borderBottom: "1px solid #444",
}}>
    <GroupBackground className="container" value={background} style={{position: "relative", zIndex: 3, height: SMALL_TITLE_HEIGHT}}/>
</div>;


const NavButtons = ({title, group, children, onBack}) => <div className="container" style={{
    zIndex: Z_TOOLBAR_BUTTONS,
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    padding: 0,
    height: SMALL_TITLE_HEIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}}>
    <BackButton groupId={group.groupId} onClick={onBack}>
        <div style={{
            color: "white",
            fontSize: 20,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "none"
        }} className="smallTitle">{title}</div>
    </BackButton>
    {children}
</div>;

const BackButton = withRouterWithQuery(({groupId, history, children, onClick}) => <div
    style={{
        cursor: "pointer",
        minWidth: 50,
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
        overflow: "hidden"
    }} onClick={() => {if (onClick) {onClick()} else {history.push(encodeQuery('/', {groupId: groupId}))}}}>
    <ToolbarButton
        className="fas fa-backward"
        style={{zIndex: Z_TOOLBAR_BUTTONS}}
    />
    {children}
</div>);
