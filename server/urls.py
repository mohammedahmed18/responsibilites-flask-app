base_api_url = "/api/v1"

# users api
get_all_users_url = f"{base_api_url}/users"


# responsibilities routes
get_all_res_url = f"{base_api_url}/res/all"
get_tomorrow_res_url = f"{base_api_url}/res/tomorrow"
get_res_by_date_url = f"{base_api_url}/res/<date>"
get_res_by_id_url = f"{base_api_url}/res/<res_id>"
get_commitment_item_by_id_url = f"{base_api_url}/res-item/<res_item_id>"
create_new_res_url = f"{base_api_url}/res"
create_new_res_item_url = f"{base_api_url}/res-item"
delete_a_res_url = f"{base_api_url}/res/<res_id>"
