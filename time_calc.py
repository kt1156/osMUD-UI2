import datetime

def convert_epoch_to_datetime(epoch_time):
    """
    Convert an epoch time (with microseconds) to a human-readable datetime string.
    
    Args:
        epoch_time (float): The epoch time to be converted.
    
    Returns:
        str: The corresponding date and time in 'YYYY-MM-DD HH:MM:SS.ffffff' format.
    """
    date_time = datetime.datetime.fromtimestamp(epoch_time)
    date_time_str = date_time.strftime('%Y-%m-%d %H:%M:%S.%f')
    return date_time_str

# Example usage:
epoch_time = 1724069082.570  # Replace with the epoch time you want to convert
print(convert_epoch_to_datetime(epoch_time))
