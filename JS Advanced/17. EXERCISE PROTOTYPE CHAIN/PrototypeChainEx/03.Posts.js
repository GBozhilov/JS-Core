function solve() {
    class Post {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }

        toString() {
            let str = `Post: ${this.title}\n`;
            str += `Content: ${this.content}`;
            return str;
        }
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content);
            this.likes = +likes;
            this.dislikes = +dislikes;
            this.comments = [];
        }

        addComment(comment) {
            this.comments.push(comment);
        }

        toString() {
            let str = super.toString() + '\n' +
                `Rating: ${this.likes - this.dislikes}`;

            if (this.comments.length) {
                str += '\nComments:';
                this.comments.forEach(c => str += `\n * ${c}`);
            }

            return str;
        }
    }

    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content);
            this.views = +views;
        }

        view() {
            this.views++;

            return this;
        }

        toString() {
            return super.toString() + `\nViews: ${this.views}`
        }
    }

    return {Post, SocialMediaPost, BlogPost};
}