

export interface Path {
    alias: string
    pid: number
    langcode: string
}

export interface DrupalNode extends Record<string, any> {
    id: string
    type: string
    langcode: string
    status: boolean
    drupal_internal__nid: number
    drupal_internal__vid: number
    changed: string
    created: string
    title: string
    default_langcode: boolean
    sticky: boolean
    path: Path
}

export interface DrupalBlock extends Record<string, any> {
    id: string
    type: string
    langcode: string
    status: boolean
    info: string,
    path: Path
}

export interface DrupalMedia extends Record<string, any> {
    id: string
    type: string
    langcode: string
    status: boolean
    drupal_internal__mid: string
    drupal_internal__vid: string
    changed: string
    created: string
    name: string
    path: Path
}

export interface DrupalFile extends Record<string, any> {
    id: string
    type: string
    langcode: string
    status: boolean
    drupal_internal__fid: string
    changed: string
    created: string
    filename: string
    uri: {
        value: string
        url: string
    }
    filesize: number
    filemime: string
    resourceIdObjMeta?: DrupalFileMeta
    path: Path
}

export interface DrupalFileMeta extends Record<string, any> {
    alt?: string
    title?: string
    width: number
    height: number
}

export interface DrupalTaxonomyTerm extends Record<string, any> {
    id: string
    type: string
    langcode: string
    status: boolean
    drupal_internal__tid: string
    changed: string
    default_langcode: boolean
    name: string
    description: string
    weight: number
    path: Path
}