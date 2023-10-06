import {mapIntefaceData} from "@shiksha/common-lib";
import {get, post, update as coreUpdate} from "@shiksha/common-lib";
import mapInterfaceData from "@shiksha/common-lib/src/services/mapInterfaceData";

const interfaceData = {
    id: 'identifier',
    name: 'name',
    subject: 'subject',
    gradeLevel: 'gradeLevel',
    category: 'primaryCategory',
    board: 'board',
    medium: 'medium',
    organisation: 'orgDetails',
    copyright: 'copyright',
    creator: 'creator',
    downloadUrl: "downloadUrl",
    streamingUrl:"streamingUrl"
}

const filters = {
    "primaryCategory": [
        "teacher resource"
    ],
    "channel": "ORG_001",
    "visibility": [
        "Default",
        "Parent"
    ],
    se_subjects: [],
    se_gradeLevels: [],
    se_mediums: [],
    se_boards: []
}

const fields = [
    "name",
    "appIcon",
    "mimeType",
    "gradeLevel",
    "identifier",
    "medium",
    "pkgVersion",
    "board",
    "subject",
    "resourceType",
    "primaryCategory",
    "contentType",
    "channel",
    "organisation",
    "trackable"
]

const softConstraints = {
    "badgeAssertions": 98,
    "channel": 100
}

const facets = [
    "se_boards",
    "se_gradeLevels",
    "se_subjects",
    "se_mediums",
    "primaryCategory"
]

const sortBy = {
    "lastPublishedOn": "desc"
}

const payload = {
    filters: {},
    "limit": 20,
    "sort_by": sortBy,
    "fields": fields,
    "softConstraints": softConstraints,
    "mode": "soft",
    "facets": facets,
    "offset": 0
}

export const getAll = async ({limit, ...params} = {}, header = {}) => {
    const finalFilters = {
        ...filters,
        se_subjects: params["se_subjects"] ? params["se_subjects"] : [],
        se_gradeLevels: params["se_gradeLevels"] ? params["se_gradeLevels"] : [],
        se_mediums: params["se_mediums"] ? params["se_mediums"] : [],
        se_boards: params["se_boards"] ? params["se_boards"] : []
    };
    const finalPayload = {...payload, filters: finalFilters};
    const resultData = await post(
        'https://diksha.gov.in/api/content/v1/search?orgdetails=orgName,email',
        {request: finalPayload},
        {}
    )
    if (resultData.data.result.content) {
        return resultData.data.result.content.map((e) => mapInterfaceData(e, interfaceData))
    } else {
        return []
    }
}

export const getOne = async (filters = {}, header = {}) => {
    const resultData = await get(
        `https://diksha.gov.in/api/content/v1/read/${filters.id}`,
        {}
    )
    if (resultData.data.result.content) {
        return mapInterfaceData(resultData.data.result.content, interfaceData)
    } else {
        return []
    }
}