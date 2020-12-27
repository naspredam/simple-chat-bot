from pathlib import Path
import sqlite3


def create_connection(sqllite_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(sqllite_file)
        print(sqlite3.version)
    finally:
        if conn:
            conn.close()


if __name__ == '__main__':
    db_file = r'./db/database.db'
    db_file_path = Path(db_file)
    if not db_file_path.is_file():
        db_file_path.parent.mkdir(parents=True, exist_ok=True)
        db_file_path.touch()
    create_connection(db_file)
