import {Jsona} from "jsona";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import type {DrupalBlock, DrupalNode, DrupalTaxonomyTerm} from "../types.ts";
import type {TJsonApiBody} from "jsona/lib/JsonaTypes";

// Get the Drupal Base Url.
export const baseUrl: string = import.meta.env.DRUPAL_BASE_URL;


/**
 * Fetch url from Drupal.
 *
 * @param url
 *
 * @return Promise<TJsonaModel | TJsonaModel[]> as Promise<any>
 */
export const fetchUrl = async (url: string): Promise<any> => {
    const request: Response = await fetch(url);
    const json: string | TJsonApiBody = await request.json();
    const dataFormatter: Jsona = new Jsona();
    return dataFormatter.deserialize(json);
}

/**
 * Get Promoted Articles.
 *
 * @return Promise<DrupalNode[]>
 */
export const getPromotedArticles = async (): Promise<DrupalNode[]> => {
    const params: DrupalJsonApiParams = new DrupalJsonApiParams();
    params.addFields("node--article", ["title", "path", "field_media_image"])
        .addInclude(["field_media_image.field_media_image"])
        .addFields("media--image", ["field_media_image"])
        .addFields("file--file", ["uri", "image_style_uri", "resourceIdObjMeta"])
        .addFilter("promote", "1")
        .addFilter("status", "1")
        .addPageLimit(1)
        .addSort("created", "DESC");
    const path: string = params.getQueryString();
    return await fetchUrl(baseUrl + '/jsonapi/node/article?' + path);
}

/**
 * Get Homepage banner block.
 *
 * @return Promise<DrupalBlock[]>
 */
export const getHomepageBanner = async (): Promise<DrupalBlock[]> => {
    const params: DrupalJsonApiParams = new DrupalJsonApiParams();
    params.addFields("block_content--banner_block", [
        "field_title",
        "field_summary",
        "field_content_link",
        "field_media_image",
    ])
        .addInclude(["field_media_image.field_media_image"])
        .addFields("media--image", ["field_media_image"])
        .addFields("file--file", ["uri", "image_style_uri", "resourceIdObjMeta"])
        .addFilter("info", "Umami Home Banner")
        .addPageLimit(1);
    const path: string = params.getQueryString();
    return await fetchUrl(baseUrl + '/jsonapi/block_content/banner_block?' + path);
}

/**
 * Get recipe banner block.
 *
 * @return Promise<DrupalBlock[]>
 */
export const getRecipesBanner = async (): Promise<DrupalBlock[]> => {
    const params: DrupalJsonApiParams = new DrupalJsonApiParams();
    params.addFields("block_content--banner_block", [
        "field_title",
        "field_summary",
        "field_content_link",
        "field_media_image",
    ])
        .addInclude(["field_media_image.field_media_image"])
        .addFields("media--image", ["field_media_image"])
        .addFields("file--file", ["uri", "image_style_uri", "resourceIdObjMeta"])
        .addFilter("info", "Umami Recipes Banner")
        .addPageLimit(1);
    const path: string = params.getQueryString();
    return await fetchUrl(baseUrl + '/jsonapi/block_content/banner_block?' + path);
}

/**
 * Get Promoted Recipes.
 *
 * @return Promise<DrupalNode[]>
 */
export const getPromotedRecipes = async (pages: number, sorting: string = 'DESC'): Promise<DrupalNode[]> => {
    const params: DrupalJsonApiParams = new DrupalJsonApiParams();
    params.addFields("node--recipe", [
        "title",
        "path",
        "field_media_image",
        "field_difficulty",
    ])
        .addInclude(["field_media_image.field_media_image"])
        .addFields("media--image", ["field_media_image"])
        .addFields("file--file", ["uri", "resourceIdObjMeta"])
        .addFilter("status", "1")
        .addFilter("promote", "1")
        .addSort("created", sorting)
        .addPageLimit(pages);
    const path: string = params.getQueryString();

    return await fetchUrl(baseUrl + '/jsonapi/node/recipe?' + path);
}

/**
 * Get Explore recipes to be shown in the homepage.
 *
 * @return Promise<DrupalNode[]>
 */
export const getExploreRecipes = async (): Promise<DrupalNode[]> => {
    const params: DrupalJsonApiParams = new DrupalJsonApiParams();
    params.addFields("node--article", [
        "title",
        "path",
        "field_media_image",
        "field_difficulty",
    ])
        .addFields("media--image", ["field_media_image"])
        .addFields("file--file", ["uri", "resourceIdObjMeta"])
        .addFilter("status", "1")
        .addFilter("promote", "1", "<>")
        .addSort("created", "DESC")
        .addPageLimit(4);
    const path: string = params.getQueryString();
    return await fetchUrl(baseUrl + '/jsonapi/node/recipe?' + path);
}

/**
 * Get all published recipes.
 *
 * @return Promise<DrupalNode[]>
 */
export const getRecipes = async (): Promise<DrupalNode[]> => {
    const params: DrupalJsonApiParams = new DrupalJsonApiParams();
    params.addFields("node--recipe", [
        "title",
        "status",
        "path",
        "field_recipe_category",
        "field_cooking_time",
        "field_difficulty",
        "field_ingredients",
        "field_number_of_servings",
        "field_preparation_time",
        "field_recipe_instruction",
        "field_summary",
        "field_tags",
        "field_media_image",
    ])
        .addInclude([
            "field_media_image.field_media_image",
            "field_recipe_category",
            "field_tags",
        ])
        .addFields("media--image", ["field_media_image"])
        .addFields("file--file", ["uri", "resourceIdObjMeta"])
        .addFields("taxonomy_term--recipe_category", ["name", "path"])
        .addFields("taxonomy_term--tags", ["name", "path"])
        .addFilter("status", "1");
    const path: string = params.getQueryString();
    return await fetchUrl(baseUrl + '/jsonapi/node/recipe?' + path);
}

/**
 * Get all published articles.
 *
 * @return Promise<DrupalNode[]>
 */
export const getArticles = async (): Promise<DrupalNode[]> => {
    const params: DrupalJsonApiParams = new DrupalJsonApiParams();
    params
        .addInclude([
            "field_media_image.field_media_image",
            "uid.user_picture",
            "field_tags",
        ])
        .addFields("node--article", [
            "title",
            "status",
            "path",
            "field_media_image",
            "body",
            "created",
            "uid",
            "field_tags",
        ])
        .addFields("user--user", ["display_name", "user_picture"])
        .addFields("media--image", ["field_media_image"])
        .addFields("file--file", ["uri", "resourceIdObjMeta"])
        .addFields("taxonomy_term--tags", ["name", "path"])
        .addFilter("status", "1");
    const path: string = params.getQueryString();
    return await fetchUrl(baseUrl + '/jsonapi/node/article?' + path);
}

/**
 * Get 16 recipes tags.
 *
 * @return Promise<DrupalTaxonomyTerm[]>.
 */
export const getRecipesCollection = async (): Promise<DrupalTaxonomyTerm[]> => {
    const params: DrupalJsonApiParams = new DrupalJsonApiParams();
    params.addFields("taxonomy_term--tags", ["name", "path"])
        .addPageLimit(16);
    const path: string = params.getQueryString();
    return await fetchUrl(baseUrl + '/jsonapi/taxonomy_term/tags?' + path);
}

/**
 * Get nodes related by Category.
 *
 * @param node
 *   - The main node.
 * @param nodes
 *   - A list Possible related nodes.
 *
 * @return DrupalNode[] | null
 */
export const getRelatedByCategories = (node: DrupalNode, nodes: DrupalNode[]): DrupalNode[] | null => {
    const categories = node.field_recipe_category && node.field_recipe_category.map((category: DrupalTaxonomyTerm) => category.id);
    return nodes.filter((item: DrupalNode) =>
            item.field_recipe_category.some((category: DrupalTaxonomyTerm) =>
                categories.includes(category.id)) && node.id != item.id)
        ?? null;
}

/**
 * Get nodes related by Tags.
 *
 * @param node
 *   - The main node.
 * @param nodes
 *   - A list Possible related nodes.
 *
 * @return DrupalNode[] | null
 */
export const getRelatedByTags = (node: DrupalNode, nodes: DrupalNode[]): DrupalNode[] | null => {
    const categories = node.field_tags.map((tag: DrupalTaxonomyTerm) => tag.id);
    return nodes.filter((item: DrupalNode) =>
        item.field_tags.some((tag: DrupalTaxonomyTerm) =>
            categories.includes(tag.id) && node.id != item.id)
        ?? null
    );
}

/**
 * Get recipe banner block.
 *
 * @return Promise<DrupalBlock[]>
 */
export const getUmamiDisclaimer = async (): Promise<DrupalBlock[]> => {
    const params: DrupalJsonApiParams = new DrupalJsonApiParams();
    params.addFields("block_content--disclaimer_block", [
        "field_copyright",
        "field_disclaimer",
    ])
        .addFilter("info", "Umami Disclaimer")
        .addPageLimit(1)
    const path: string = params.getQueryString();
    return await fetchUrl(baseUrl + '/jsonapi/block_content/disclaimer_block?' + path);
}
/**
 * Get recipe banner block.
 *
 * @return Promise<DrupalBlock[]>
 */
export const getUmamiPromoBlock = async (): Promise<DrupalBlock[]> => {
    const params: DrupalJsonApiParams = new DrupalJsonApiParams();
    params
        .addInclude([
            "field_media_image.field_media_image"
        ])
        .addFields("block_content--footer_promo_block", [
            "field_media_image",
            "field_summary",
            "field_title",
            "field_content_link"
        ])
        .addFields("media--image", ["field_media_image"])
        .addFields("file--file", ["uri", "resourceIdObjMeta"])
        .addFilter("info", "Umami footer promo")
        .addPageLimit(1)
    const path: string = params.getQueryString();
    return await fetchUrl(baseUrl + '/jsonapi/block_content/footer_promo_block?' + path);
}

export const getFeaturedArticles = async (node: DrupalNode): Promise<DrupalNode[]> => {
    const articles: DrupalNode[] = await getArticles();
    const index = articles.findIndex(article => article.id == node.id);
    return articles.sort((a: DrupalNode, b: DrupalNode) => new Date(b.created).valueOf() - new Date(a.created).valueOf()).slice(index + 1, index + 4);
}


/**
 * Get all tags terms.
 *
 * @return Promise<DrupalNode[]>
 */
export const getTags = async (): Promise<DrupalNode[]> => {
    const params: DrupalJsonApiParams = new DrupalJsonApiParams();
    params
        .addFields("taxonomy_term--tags", [
            "name",
            "status",
            "path",
            "body",
            "created",
        ])
        .addFilter("status", "1");
    const path: string = params.getQueryString();
    return await fetchUrl(baseUrl + '/jsonapi/taxonomy_term/tags?' + path);
}

/**
 * Get all categories terms.
 *
 * @return Promise<DrupalNode[]>
 */
export const getCategories = async (): Promise<DrupalNode[]> => {
    const params: DrupalJsonApiParams = new DrupalJsonApiParams();
    params
        .addFields("taxonomy_term--recipe_category", [
            "name",
            "status",
            "path",
            "body",
            "created",
        ])
        .addFilter("status", "1");
    const path: string = params.getQueryString();
    return await fetchUrl(baseUrl + '/jsonapi/taxonomy_term/recipe_category?' + path);
}

/**
 * Get nodes related by Tags.
 *
 * @param path
 *   - The tag path.
 *
 * @return DrupalNode[] | null
 */
export const getRelatedTags = async (path: string): Promise<DrupalNode[] | null> => {
    const recipes = await getRecipes();
    const articles = await getArticles();
    const related = [...articles, ...recipes];

    return related.filter((item: DrupalNode) =>
        item.field_tags.some((tag: DrupalTaxonomyTerm) => {
            return tag.path.alias === path
        })
        ?? null
    );
}

/**
 * Get nodes related by Categories.
 *
 * @param path
 *   - The category path.
 *
 * @return DrupalNode[] | null
 */
export const getRelatedCategories = async (path: string): Promise<DrupalNode[] | null> => {
    const recipes = await getRecipes();

    return recipes.filter((item: DrupalNode) =>
        item.field_recipe_category.some((category: DrupalTaxonomyTerm) => {
            return category.path.alias === path
        })
        ?? null
    );
}
export default fetchUrl;
