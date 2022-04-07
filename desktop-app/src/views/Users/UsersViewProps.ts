/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import {User} from "../../api/entities/User";

export interface UsersViewProps {
    users:User[];
    onReload:any;
    hasMore:boolean;
}
