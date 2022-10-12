import { handler } from '../../services/SpacesTable/Create';

const event = {
    body: {
        location: 'PH'
    }
}


handler(event as any, {} as any);