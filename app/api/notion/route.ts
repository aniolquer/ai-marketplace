type TA = object; // Replace 'any' with your actual type

const NotionAPI = {
    getActivities: async (): Promise<TA[]> => {
        // Replace with your actual API call
        return fetch('/api/activities').then(res => res.json());
    },

    getActivityListByIds: async (ids: string[]): Promise<TA[]> => {
        // Replace with your actual API call
        return fetch(`/api/activities?ids=${ids.join(',')}`).then(res => res.json());
    },

    getActivityById: async (id: string): Promise<TA[]> => {
        // Replace with your actual API call
        return fetch(`/api/activities/${id}`).then(res => res.json());
    }
};
