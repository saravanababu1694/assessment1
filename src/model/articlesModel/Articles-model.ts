export class deleteModel {

    article_id: number;
    title: number;
    description: string

    constructor(article_id?: number,
        title?: number,
        description?: string
    ) {
        this.article_id = article_id;
        this.title = title;
        this.description = description;

    }

}
