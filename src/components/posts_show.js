import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

//action
import { fetchPost, deletePost } from '../actions'

class PostsShow extends Component {
    componentDidMount() {
        console.log(this.props.match)
        if (!this.props.post) {
            const { id } = this.props.match.params
            this.props.fetchPost(id)
        }
    }

    onDeleteClick() {
        const { id } = this.props.match.params
        this.props.deletePost(id, () => {
            this.props.history.push('/')
        })
    }

    render() {
        const { post } = this.props

        if (!post) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <Link className="btn btn-info" to="/">&#x21E6; Back To Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h5>Categories: {post.categories}</h5>
                <p>{post.content}</p>
            </div>
        )
    }
}

function mapStateTopProps({ posts }, ownProps) {
    return {post: posts[ownProps.match.params.id] }
}


export default connect(mapStateTopProps, { fetchPost, deletePost })(PostsShow)